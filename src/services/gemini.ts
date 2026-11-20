import type { KisiKisiItem, Question } from '../types';
import { SecurityService } from './security';
import { PreferencesService } from './preferences';
import { cleanMathText } from '../utils/mathFormat';

const CANDIDATE_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-2.5-flash-lite',
];

const MATH_SIMPLICITY_RULE = `
ATURAN WAJIB PENULISAN RUMUS & MATEMATIKA (SANGAT PENTING):
1. DILARANG KERAS menggunakan rumus perbandingan dengan notasi ganda rumit (seperti q21, q22, q11, q12 atau rumus bertingkat pecahan dalam pecahan) yang bikin siswa pusing!
2. DILARANG menggunakan kode LaTeX mentah seperti \\frac{...}{...}, \\times, \\left(, \\right) atau tanda dollar ganda $$...$$ atau $...$.
3. Tulis rumus dalam teks bersih yang gampang dibaca di layar HP/laptop, misalnya:
   F = k * (q1 * q2) / r^2
4. Selalu jelaskan TRIK LOGIKA NALAR PRAKTIS daripada rumus perbandingan yang njelimet!
   Contoh penjelasan perbandingan jarak:
   "Gak usah ngafal rumus perbandingan yang bikin pusing! Cukup ingat trik nalar ini:
   - Jarak itu berbanding terbalik dan dikuadratkan.
   - Kalau jarak dijadiin 3x lipat, gayanya tinggal dibagi 3 kuadrat (dibagi 9) -> jadi 1/9 F.
   - Kalau jarak didekatkan jadi 1/2 kali semula, gayanya dikali 2 kuadrat (dikali 4) -> jadi 4 F.
   Udah gitu doang, beres tanpa hitungan rumit!"
5. Utamakan bahasa yang ramah manusia dan mudah dicerna anak sekolah!
`;

export const GeminiService = {
  async callGemini(prompt: string, isJson: boolean = false, systemInstruction?: string): Promise<string> {
    const settings = PreferencesService.getSettings();
    const apiKey = settings.apiKey || SecurityService.getApiKey();
    if (!apiKey) {
      throw new Error('API Key Gemini belum dipasang! Buka menu Keamanan / Settings untuk memasukkan API Key.');
    }

    if (settings.rateLimitEnabled) {
      const rateCheck = SecurityService.checkRateLimit();
      if (!rateCheck.allowed) {
        throw new Error(`Sabar ya! Tunggu ${rateCheck.waitSeconds} detik lagi sebelum kirim permintaan baru (Proteksi Rate-Limit).`);
      }
    }

    const primaryModel = settings.selectedModel || SecurityService.getModel();
    const modelsToTry = [primaryModel, ...CANDIDATE_MODELS.filter((m) => m !== primaryModel)];

    let lastError: any = null;

    // Enhance system instruction with user preferences
    let enhancedInstruction = systemInstruction || '';
    if (settings.antiLatexRule && !enhancedInstruction.includes('ATURAN WAJIB PENULISAN RUMUS')) {
      enhancedInstruction = `${MATH_SIMPLICITY_RULE}\n\n${enhancedInstruction}`;
    }

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const body: any = {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: settings.temperature || 0.4,
            maxOutputTokens: 3000,
          }
        };

        if (isJson) {
          body.generationConfig.responseMimeType = 'application/json';
        }

        if (enhancedInstruction) {
          body.systemInstruction = {
            parts: [{ text: enhancedInstruction }]
          };
        }

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          const data = await response.json();
          const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (outputText) {
            return isJson ? outputText : cleanMathText(outputText);
          }
        }

        const errData = await response.json().catch(() => ({}));
        const errMsg = errData?.error?.message || response.statusText;

        if (response.status === 404 || response.status === 503) {
          lastError = new Error(`Model ${model} (${response.status}): ${errMsg}`);
          continue;
        }

        if (response.status === 400 && errMsg.includes('API_KEY_INVALID')) {
          throw new Error('API Key tidak valid! Periksa kembali key yang Anda masukkan.');
        }

        throw new Error(`Gagal memanggil Gemini (${response.status}): ${errMsg}`);
      } catch (err: any) {
        lastError = err;
        if (err.message && err.message.includes('API Key tidak valid')) {
          throw err;
        }
      }
    }

    throw lastError || new Error('Semua model Gemini sedang sibuk, coba beberapa saat lagi.');
  },

  async generateQuestionsForIndicator(item: KisiKisiItem, subjectName: string): Promise<Question[]> {
    const systemPrompt = `Anda adalah guru pembuat naskah soal resmi Asesmen Akhir Semester (AAS) kurikulum Indonesia.
Format output WAJIB JSON murni array of Question. Hindari markdown code fences tambahan jika memungkinkan.
${MATH_SIMPLICITY_RULE}`;

    const prompt = `Buatlah 2 variasi soal latihan ujian untuk:
Mata Pelajaran: ${subjectName}
Bab: ${item.bab}
Materi: ${item.materi}
Indikator Soal: "${item.indikator}"
Level Kognitif Target: ${item.levelKognitif}
Bentuk Soal Target: ${item.bentukSoal}
Nomor Soal: ${item.no}

Format output JSON array:
[
  {
    "id": "gen_${item.no}_${Date.now()}",
    "noSoal": ${item.no},
    "bab": "${item.bab}",
    "materi": "${item.materi}",
    "indikator": "${item.indikator}",
    "level": "${item.levelKognitif}",
    "type": "${item.bentukSoal}",
    "questionText": "Teks soal lengkap beserta angka/narasi kasus yang realistis",
    "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "correctAnswer": 0,
    "explanation": "Langkah pengerjaan matematis atau logika ilmiah secara runut dan jelas menggunakan bahasa sederhana.",
    "formulaOrConcept": "Rumus atau konsep inti yang digunakan (dalam teks simpel)",
    "trapWarning": "Jebakan yang sering membuat siswa salah menjawab di ujian"
  }
]`;

    const jsonStr = await this.callGemini(prompt, true, systemPrompt);
    try {
      const cleanJson = jsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      throw new Error('Gagal mengolah format JSON dari AI.');
    }
  },

  async askTutor(
    question: string,
    contextInfo: { subjectName: string; currentTopic?: string; relatedIndicator?: string },
    persona: 'bro' | 'teacher' | 'socratic' = 'bro',
    chatHistory: { role: 'user' | 'assistant'; content: string }[] = []
  ): Promise<string> {
    let personaInstruction = '';
    if (persona === 'bro') {
      personaInstruction = `Gaya bahasa Anda adalah "Temen Nongkrong Pintar" (santai, seru, pake bahasa gaul tongkrongan Indonesia yang akrab kayak "lu/gw, santai bro, trik cepetnya gini nih"). Jangan kaku, pake analogi kehidupan sehari-hari anak muda biar gampang nyantol di otak, tapi PENALARAN DAN RUMUSNYA TETAP 100% AKURAT.`;
    } else if (persona === 'teacher') {
      personaInstruction = `Gaya bahasa Anda adalah "Guru Privat Berpengalaman" (ramah, sabar, runut, menjelaskan rumus langkah demi langkah dari dasar sampai contoh soal).`;
    } else {
      personaInstruction = `Gaya bahasa Anda adalah "Metode Sokrates" (JANGAN langsung memberi tahu jawaban akhir! Pancing pikiran murid dengan pertanyaan pengarah bertahap agar murid bisa menyimpulkan rumusnya sendiri).`;
    }

    const systemPrompt = `Anda adalah AI Tutor pendamping belajar Asesmen Akhir Semester untuk ${contextInfo.subjectName}.
${personaInstruction}
${MATH_SIMPLICITY_RULE}
Topik yang sedang dipelajari: ${contextInfo.currentTopic || 'Materi Umum'}
Indikator terkait: ${contextInfo.relatedIndicator || '-'}
Fokus pada akurasi konsep, berikan trik cepat mengingat jika ada rumus, dan selalu peringatkan jebakan soal ujian yang sering mengecoh.`;

    let promptWithHistory = '';
    if (chatHistory.length > 0) {
      promptWithHistory += 'RIWAYAT PERCAKAPAN SEBELUMNYA:\n';
      chatHistory.slice(-4).forEach((msg) => {
        promptWithHistory += `${msg.role === 'user' ? 'Murid' : 'Tutor'}: ${msg.content}\n`;
      });
      promptWithHistory += '\nPERTANYAAN BARU DARI MURID:\n';
    }
    promptWithHistory += question;

    return await this.callGemini(promptWithHistory, false, systemPrompt);
  },

  async parseKisiKisiText(rawText: string, subjectName: string): Promise<KisiKisiItem[]> {
    const systemPrompt = `Anda adalah parser dokumen kurikulum sekolah Indonesia.
Ubah tabel teks atau kisi-kisi markdown yang diberikan menjadi format JSON array of KisiKisiItem.
Tiap item wajib memiliki: no (number), bab (string), materi (string), indikator (string), levelKognitif ("C1"|"C2"|"C3"|"C4"|"C5"), bentukSoal ("PG"|"PG Kompleks"|"Benar-Salah"|"Uraian").`;

    const prompt = `Ekstrak seluruh baris kisi-kisi berikut untuk mata pelajaran ${subjectName} menjadi JSON:

${rawText}

Skema JSON:
[
  {
    "id": "k_1",
    "no": 1,
    "bab": "Nama Bab",
    "materi": "Nama Materi Pokok",
    "indikator": "Kalimat indikator lengkap",
    "levelKognitif": "C2",
    "bentukSoal": "PG"
  }
]`;

    const jsonStr = await this.callGemini(prompt, true, systemPrompt);
    try {
      const cleanJson = jsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      throw new Error('Gagal mem-parsing kisi-kisi. Pastikan format teks kisi-kisi terbaca dengan jelas.');
    }
  }
};
