import type { Subject, KisiKisiItem, Question, CheatSheetTopic } from '../types';

export const IPA_KISI_KISI: KisiKisiItem[] = [
  {
    id: 'k1',
    no: 1,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Perpindahan Elektron)',
    indikator: 'Murid mampu menjelaskan proses perpindahan elektron pada benda yang digosokkan sehingga bermuatan listrik.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k2',
    no: 2,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Hukum Coulomb)',
    indikator: 'Murid mampu menentukan besar gaya Coulomb berdasarkan perubahan jarak antara dua muatan listrik.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k3',
    no: 3,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Interaksi Muatan Listrik)',
    indikator: 'Murid mampu menentukan jenis muatan listrik berdasarkan interaksi tarik-menarik dan tolak-menolak antarbenda.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k4',
    no: 4,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Penangkal Petir)',
    indikator: 'Disajikan wacana tentang fenomena petir dan penggunaan penangkal petir pada gedung tinggi, murid mampu menganalisis prinsip kerja penangkal petir dan fenomena listrik statis.',
    levelKognitif: 'C4',
    bentukSoal: 'PG Kompleks'
  },
  {
    id: 'k5',
    no: 5,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Sifat Muatan Listrik dan Penerapannya pada Makhluk Hidup)',
    indikator: 'Murid mampu mengidentifikasi sifat benda netral, interaksi muatan listrik, dan peran muatan listrik dalam penghantaran impuls saraf.',
    levelKognitif: 'C2',
    bentukSoal: 'Benar-Salah'
  },
  {
    id: 'k6',
    no: 6,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Medan Listrik dan Garis Gaya Listrik)',
    indikator: 'Disajikan gambar garis-garis medan listrik, murid mampu menganalisis arah, kerapatan, dan karakteristik medan listrik.',
    levelKognitif: 'C2',
    bentukSoal: 'PG Kompleks'
  },
  {
    id: 'k7',
    no: 7,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Penerapan Listrik Statis dalam Kehidupan)',
    indikator: 'Murid mampu menjelaskan bahaya listrik statis dan kaitannya dengan keselamatan saat pengisian bahan bakar di SPBU.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k8',
    no: 8,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Kuat Arus Listrik)',
    indikator: 'Murid mampu menghitung kuat arus listrik berdasarkan jumlah muatan listrik dan waktu aliran listrik.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k9',
    no: 9,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Beda Potensial Listrik)',
    indikator: 'Disajikan wacana tentang penggunaan baterai dalam rangkaian listrik, murid mampu menjelaskan pengertian beda potensial listrik.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k10',
    no: 10,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Hukum I Kirchhoff)',
    indikator: 'Disajikan gambar titik percabangan arus listrik, murid mampu menentukan kuat arus listrik berdasarkan Hukum I Kirchhoff.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k11',
    no: 11,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Hambatan Pengganti)',
    indikator: 'Disajikan gambar rangkaian hambatan listrik, murid mampu menghitung besar hambatan pengganti rangkaian.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k12',
    no: 12,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Hukum Ohm)',
    indikator: 'Disajikan gambar rangkaian listrik, murid mampu menghitung kuat arus listrik berdasarkan tegangan dan hambatan menggunakan Hukum Ohm.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k13',
    no: 13,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Daya Listrik)',
    indikator: 'Disajikan gambar peralatan listrik berupa setrika dan informasi kuat arus, murid mampu menghitung daya listrik berdasarkan tegangan dan kuat arus.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k14',
    no: 14,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Rangkaian Paralel)',
    indikator: 'Disajikan wacana tentang penggunaan peralatan listrik di rumah, murid mampu menganalisis karakteristik rangkaian paralel.',
    levelKognitif: 'C2',
    bentukSoal: 'Benar-Salah'
  },
  {
    id: 'k15',
    no: 15,
    bab: 'Sistem Saraf',
    materi: 'Sistem Saraf (Struktur dan Fungsi Neuron)',
    indikator: 'Murid mampu mengidentifikasi fungsi dendrit, badan sel, inti sel, selubung mielin, dan nodus Ranvier pada neuron.',
    levelKognitif: 'C2',
    bentukSoal: 'Benar-Salah'
  },
  {
    id: 'k16',
    no: 16,
    bab: 'Sistem Saraf',
    materi: 'Sistem Saraf (Bagian Otak dan Fungsinya)',
    indikator: 'Disajikan wacana tentang seseorang yang mengalami gangguan keseimbangan tubuh, murid mampu menentukan bagian otak yang berperan dalam koordinasi gerak dan keseimbangan.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k17',
    no: 17,
    bab: 'Sistem Saraf',
    materi: 'Sistem Saraf (Gerak Refleks)',
    indikator: 'Disajikan wacana tentang peristiwa menyentuh benda panas, murid mampu menentukan bagian sistem saraf yang mengendalikan gerak refleks.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k18',
    no: 18,
    bab: 'Sistem Saraf',
    materi: 'Sistem Saraf (Mekanisme Gerak Refleks)',
    indikator: 'Disajikan wacana tentang respons tubuh ketika menyentuh benda panas, murid mampu menentukan urutan jalannya impuls saraf pada gerak refleks.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k19',
    no: 19,
    bab: 'Sistem Saraf',
    materi: 'Sistem Saraf (Kelainan Parkinson)',
    indikator: 'Disajikan wacana tentang gejala gangguan gerak akibat kerusakan sel saraf penghasil dopamin, murid mampu mengidentifikasi jenis kelainan sistem saraf.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k20',
    no: 20,
    bab: 'Sistem Saraf',
    materi: 'Sistem Saraf (Kelainan dan Penyakit pada Sistem Saraf)',
    indikator: 'Disajikan beberapa pernyataan tentang kelainan sistem saraf, murid mampu menganalisis hubungan antara jenis kelainan dengan ciri-ciri dan penyebabnya.',
    levelKognitif: 'C4',
    bentukSoal: 'PG'
  },
  {
    id: 'k21',
    no: 21,
    bab: 'Sistem Reproduksi',
    materi: 'Sistem Reproduksi Pria (Organ dan Fungsinya)',
    indikator: 'Disajikan gambar sistem reproduksi pria, murid mampu mengidentifikasi organ reproduksi berdasarkan nomor dan menjelaskan keterkaitan fungsinya.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k22',
    no: 22,
    bab: 'Sistem Reproduksi',
    materi: 'Sistem Reproduksi Wanita (Organ dan Jalur Sel Telur)',
    indikator: 'Disajikan gambar sistem reproduksi wanita dengan penanda huruf pada organ, murid mampu menentukan urutan perjalanan sel telur setelah ovulasi.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k23',
    no: 23,
    bab: 'Sistem Reproduksi',
    materi: 'Sistem Reproduksi Wanita (Hormon Reproduksi dan Ovulasi)',
    indikator: 'Murid mampu menjelaskan peran hormon LH dalam memicu proses ovulasi pada siklus menstruasi.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k24',
    no: 24,
    bab: 'Sistem Reproduksi',
    materi: 'Sistem Reproduksi Wanita (Fertilisasi dan Fungsi Plasenta)',
    indikator: 'Disajikan wacana tentang pertukaran zat antara ibu dan janin selama kehamilan, murid mampu menjelaskan fungsi utama plasenta.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k25',
    no: 25,
    bab: 'Sistem Reproduksi',
    materi: 'Sistem Reproduksi Wanita (Gangguan pada Organ Reproduksi)',
    indikator: 'Disajikan wacana tentang kasus infertilitas akibat penyumbatan saluran reproduksi, murid mampu menentukan organ yang mengalami gangguan beserta fungsinya.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k26',
    no: 26,
    bab: 'Sistem Reproduksi',
    materi: 'Sistem Reproduksi Manusia (Penyakit Menular Seksual)',
    indikator: 'Disajikan wacana tentang infeksi bakteri Treponema pallidum, murid mampu mengidentifikasi jenis penyakit menular seksual dan cara penularannya.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k27',
    no: 27,
    bab: 'Sistem Reproduksi',
    materi: 'Sistem Reproduksi Pria (Spermatogenesis dan Faktor yang Memengaruhi Kualitas Sperma)',
    indikator: 'Disajikan wacana tentang pengaruh suhu dan gaya hidup terhadap kualitas sperma, murid mampu menganalisis kebenaran pernyataan terkait faktor-faktor yang memengaruhi spermatogenesis.',
    levelKognitif: 'C3',
    bentukSoal: 'Benar-Salah'
  },
  {
    id: 'k28',
    no: 28,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Struktur Kromosom)',
    indikator: 'Murid mampu mengidentifikasi bagian kromosom yang berfungsi menghubungkan kromatid kembar dan menjadi tempat melekatnya benang spindel.',
    levelKognitif: 'C1',
    bentukSoal: 'PG'
  },
  {
    id: 'k29',
    no: 29,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Hubungan Gen, DNA, dan Kromosom)',
    indikator: 'Murid mampu menjelaskan hubungan antara gen, DNA, dan kromosom dalam pewarisan sifat.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k30',
    no: 30,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Kromosom Penentu Jenis Kelamin)',
    indikator: 'Disajikan wacana tentang kromosom kelamin manusia, murid mampu menjelaskan peran kromosom X dan Y dalam menentukan jenis kelamin keturunan.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k31',
    no: 31,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Sifat Genetik dan Pengaruh Lingkungan)',
    indikator: 'Disajikan wacana tentang sifat fisik yang diwariskan dan perubahan akibat lingkungan, murid mampu membedakan sifat keturunan yang dipengaruhi faktor genetik dan lingkungan.',
    levelKognitif: 'C3',
    bentukSoal: 'Benar-Salah'
  },
  {
    id: 'k32',
    no: 32,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Genotipe dan Fenotipe)',
    indikator: 'Murid mampu membedakan pengertian genotipe dan fenotipe beserta contohnya dalam pewarisan sifat.',
    levelKognitif: 'C2',
    bentukSoal: 'PG'
  },
  {
    id: 'k33',
    no: 33,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Persilangan Monohibrid Dominansi Penuh)',
    indikator: 'Disajikan persilangan dua individu heterozigot, murid mampu menentukan perbandingan genotipe dan fenotipe keturunannya.',
    levelKognitif: 'C3',
    bentukSoal: 'PG Kompleks'
  },
  {
    id: 'k34',
    no: 34,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Persilangan Monohibrid Intermediet)',
    indikator: 'Disajikan wacana hasil persilangan bunga pukul empat, murid mampu menganalisis pola pewarisan sifat intermediet dan perbandingan genotipe serta fenotipe keturunannya.',
    levelKognitif: 'C3',
    bentukSoal: 'Benar-Salah'
  },
  {
    id: 'k35',
    no: 35,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Persilangan Dihibrid)',
    indikator: 'Disajikan wacana tentang persilangan dua sifat pada tanaman ercis, murid mampu menghitung jumlah keturunan dengan kombinasi fenotipe tertentu berdasarkan persilangan dihibrid.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k36',
    no: 36,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Persilangan Dihibrid)',
    indikator: 'Disajikan wacana tentang persilangan dua sifat pada kelinci, murid mampu menentukan perbandingan fenotipe keturunan hasil persilangan dihibrid.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k37',
    no: 37,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Genotipe dan Fenotipe pada Persilangan Dihibrid)',
    indikator: 'Disajikan informasi tentang simbol gen dominan dan resesif pada ayam, murid mampu menentukan fenotipe berdasarkan kombinasi genotipe yang diberikan.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k38',
    no: 38,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Pewarisan Golongan Darah Sistem ABO)',
    indikator: 'Disajikan kasus perkawinan dengan golongan darah tertentu, murid mampu menentukan kemungkinan golongan darah keturunannya berdasarkan persilangan sistem ABO.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k39',
    no: 39,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Kelainan Genetik Autosomal Resesif)',
    indikator: 'Disajikan wacana tentang persilangan individu normal heterozigot pembawa sifat albino, murid mampu menghitung peluang munculnya keturunan albino.',
    levelKognitif: 'C3',
    bentukSoal: 'PG'
  },
  {
    id: 'k40',
    no: 40,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Penyakit Menurun Terpaut Kromosom X)',
    indikator: 'Disajikan wacana tentang pewarisan penyakit hemofilia dalam keluarga, murid mampu menganalisis alasan laki-laki lebih berpeluang mengalami hemofilia dibandingkan perempuan.',
    levelKognitif: 'C4',
    bentukSoal: 'PG'
  }
];

export const IPA_QUESTIONS: Question[] = [
  {
    id: 'q1',
    noSoal: 1,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Perpindahan Elektron)',
    indikator: 'Menjelaskan proses perpindahan elektron pada benda yang digosokkan sehingga bermuatan listrik.',
    level: 'C2',
    type: 'PG',
    questionText: 'Sebuah penggaris plastik yang digosokkan pada kain wol kemudian dapat menarik potongan-potongan kertas kecil. Mengapa penggaris plastik tersebut menjadi bermuatan listrik setelah digosokkan?',
    options: [
      'Proton berpindah dari penggaris plastik ke kain wol, sehingga penggaris kelebihan elektron.',
      'Elektron berpindah dari kain wol ke penggaris plastik, sehingga penggaris bermuatan negatif.',
      'Proton berpindah dari kain wol ke penggaris plastik, sehingga penggaris bermuatan positif.',
      'Elektron berpindah dari penggaris plastik ke kain wol, sehingga penggaris bermuatan netral.'
    ],
    correctAnswer: 1,
    explanation: 'Hanya ELEKTRON yang dapat berpindah saat penggosokan. Penggaris plastik memiliki afinitas elektron lebih tinggi dibanding kain wol, sehingga elektron dari kain wol berpindah ke penggaris plastik. Akibatnya, penggaris kelebihan elektron dan bermuatan negatif.',
    formulaOrConcept: 'Plastik + Wol -> Elektron Wol pindah ke Plastik (Plastik Negatif, Wol Positif). Kaca + Sutra -> Elektron Kaca pindah ke Sutra (Kaca Positif, Sutra Negatif).',
    trapWarning: 'Ingat! Proton terikat kuat di inti atom, proton TIDAK PERNAH berpindah saat benda digosok.'
  },
  {
    id: 'q2',
    noSoal: 2,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Hukum Coulomb)',
    indikator: 'Menentukan besar gaya Coulomb berdasarkan perubahan jarak antara dua muatan listrik.',
    level: 'C3',
    type: 'PG',
    questionText: 'Dua buah benda bermuatan listrik sejenis terpisah sejauh r dan mengalami gaya tolak-menolak sebesar F. Jika jarak antara kedua muatan diperbesar menjadi 3r sedangkan besar kedua muatan tetap, besar gaya tolak-menolak menjadi...',
    options: [
      '9F',
      '3F',
      '1/3 F',
      '1/9 F'
    ],
    correctAnswer: 3,
    explanation: 'Menurut Hukum Coulomb, F = k*(q1*q2)/r^2. Artinya F berbanding terbalik dengan kuadrat jarak (r^2). Jika r menjadi 3 kali semula, maka gaya menjadi 1/(3^2) = 1/9 kali semula.',
    formulaOrConcept: 'F2 = F1 * (r1 / r2)^2 = F * (r / 3r)^2 = (1/9)F',
    trapWarning: 'Banyak yang keliru menjawab 1/3 F karena lupa mengkuadratkan jaraknya (r^2)!'
  },
  {
    id: 'q3',
    noSoal: 3,
    bab: 'Listrik Statis',
    materi: 'Listrik Statis (Interaksi Muatan Listrik)',
    indikator: 'Menentukan jenis muatan listrik berdasarkan interaksi tarik-menarik dan tolak-menolak antarbenda.',
    level: 'C3',
    type: 'PG',
    questionText: 'Terdapat empat benda bermuatan: P, Q, R, dan S. Jika P menarik Q, Q menolak R, dan R menarik S yang diketahui bermuatan negatif, maka jenis muatan P, Q, dan R berturut-turut adalah...',
    options: [
      'Positif, Negatif, Negatif',
      'Negatif, Positif, Positif',
      'Positif, Positif, Negatif',
      'Negatif, Negatif, Positif'
    ],
    correctAnswer: 1,
    explanation: 'Mulai dari yang sudah diketahui: S bernilai negatif (-). R menarik S -> R bermuatan Positif (+). Q menolak R -> Q bermuatan sejenis dengan R, yaitu Positif (+). P menarik Q -> P bermuatan berlawanan dengan Q, yaitu Negatif (-). Jadi P = Negatif, Q = Positif, R = Positif.',
    formulaOrConcept: 'Muatan sejenis = Tolak-menolak (+ dengan +, atau - dengan -). Muatan berbeda jenis = Tarik-menarik (+ dengan -).',
    trapWarning: 'Selalu runut dari benda yang sudah diketahui jenis muatannya (S = negatif).'
  },
  {
    id: 'q8',
    noSoal: 8,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Kuat Arus Listrik)',
    indikator: 'Menghitung kuat arus listrik berdasarkan jumlah muatan listrik dan waktu aliran listrik.',
    level: 'C3',
    type: 'PG',
    questionText: 'Muatan listrik sebesar 180 Coulomb mengalir melalui seutas kawat penghantar selama 1,5 menit. Berapakah kuat arus listrik yang mengalir dalam kawat tersebut?',
    options: [
      '120 A',
      '2 A',
      '0,5 A',
      '1,2 A'
    ],
    correctAnswer: 1,
    explanation: 'Kuat arus I = Q / t. Waktu wajib diubah ke detik (SI): t = 1,5 menit = 1,5 * 60 detik = 90 detik. Maka I = 180 C / 90 s = 2 Ampere.',
    formulaOrConcept: 'I = Q / t (I dalam Ampere, Q dalam Coulomb, t dalam sekon/detik)',
    trapWarning: 'Jangan langsung membagi 180 dengan 1,5! Satuan waktu WAJIB dikonversi ke detik terlebih dahulu.'
  },
  {
    id: 'q10',
    noSoal: 10,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Hukum I Kirchhoff)',
    indikator: 'Menentukan kuat arus listrik berdasarkan Hukum I Kirchhoff pada titik percabangan.',
    level: 'C3',
    type: 'PG',
    questionText: 'Pada suatu titik percabangan arus listrik, arus masuk terdiri dari I1 = 4 A dan I2 = 6 A. Arus keluar terbagi menjadi tiga cabang: I3 = 3 A, I4 = 2 A, dan I5. Berapakah besar kuat arus I5?',
    options: [
      '5 A',
      '7 A',
      '10 A',
      '15 A'
    ],
    correctAnswer: 0,
    explanation: 'Menurut Hukum I Kirchhoff: Sigma I_masuk = Sigma I_keluar. Arus masuk = 4 A + 6 A = 10 A. Arus keluar = 3 A + 2 A + I5 = 5 A + I5. Maka I5 = 10 A - 5 A = 5 Ampere.',
    formulaOrConcept: 'Sigma I_masuk = Sigma I_keluar (Jumlah arus masuk percabangan = Jumlah arus keluar percabangan)',
    trapWarning: 'Perhatikan arah tanda panah masuk atau keluar pada diagram titik percabangan.'
  },
  {
    id: 'q11',
    noSoal: 11,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Hambatan Pengganti)',
    indikator: 'Menghitung besar hambatan pengganti rangkaian seri dan paralel.',
    level: 'C3',
    type: 'PG',
    questionText: 'Tiga buah resistor masing-masing berukuran R1 = 6 ohm, R2 = 3 ohm, dan R3 = 2 ohm dirangkai secara paralel. Besar hambatan pengganti total rangkaian tersebut adalah...',
    options: [
      '11 ohm',
      '1 ohm',
      '2 ohm',
      '0,5 ohm'
    ],
    correctAnswer: 1,
    explanation: '1/Rp = 1/R1 + 1/R2 + 1/R3 = 1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 6/6 = 1. Maka Rp = 1 / 1 = 1 ohm.',
    formulaOrConcept: 'Rangkaian Seri: Rs = R1 + R2 + ... | Rangkaian Paralel: 1/Rp = 1/R1 + 1/R2 + 1/R3',
    trapWarning: 'Hasil penjumlahan pecahan 1/Rp harus DIBALIK untuk mendapatkan nilai Rp.'
  },
  {
    id: 'q12',
    noSoal: 12,
    bab: 'Listrik Dinamis',
    materi: 'Listrik Dinamis (Hukum Ohm)',
    indikator: 'Menghitung kuat arus listrik berdasarkan tegangan dan hambatan menggunakan Hukum Ohm.',
    level: 'C3',
    type: 'PG',
    questionText: 'Sebuah lampu dengan hambatan 24 ohm dihubungkan dengan sumber tegangan aki sebesar 12 Volt. Kuat arus listrik yang mengalir melalui lampu adalah...',
    options: [
      '2 A',
      '0,5 A',
      '288 A',
      '12 A'
    ],
    correctAnswer: 1,
    explanation: 'Hukum Ohm: V = I * R -> I = V / R. Maka I = 12 V / 24 ohm = 0,5 Ampere.',
    formulaOrConcept: 'V = I * R | I = V / R | R = V / I',
    trapWarning: 'Jangan terbalik antara V/R dengan R/V!'
  },
  {
    id: 'q16',
    noSoal: 16,
    bab: 'Sistem Saraf',
    materi: 'Sistem Saraf (Bagian Otak dan Fungsinya)',
    indikator: 'Menentukan bagian otak yang berperan dalam koordinasi gerak dan keseimbangan.',
    level: 'C3',
    type: 'PG',
    questionText: 'Seorang atlet senam dapat melakukan gerakan akrobatik dan menjaga keseimbangan tubuhnya saat berjalan di atas balok titian. Bagian otak yang berperan utama sebagai pusat keseimbangan dan koordinasi gerakan otot tersebut adalah...',
    options: [
      'Otak besar (Cerebrum)',
      'Otak kecil (Cerebellum)',
      'Sumsum lanjutan (Medula oblongata)',
      'Otak tengah (Mesensefalon)'
    ],
    correctAnswer: 1,
    explanation: 'Otak kecil (Cerebellum) berfungsi sebagai pusat keseimbangan tubuh, koordinasi gerak otot sadar, serta mempertahankan postur tubuh. Cerebrum adalah pusat kesadaran dan berpikir. Medula oblongata mengatur gerak tak sadar seperti denyut jantung dan pernapasan.',
    formulaOrConcept: 'Cerebrum = Berpikir & Memori | Cerebellum = Keseimbangan & Koordinasi Motorik | Medula Oblongata = Fungsi Vital Otomatis',
    trapWarning: 'Bedakan Cerebrum (Otak Besar) dengan Cerebellum (Otak Kecil).'
  },
  {
    id: 'q18',
    noSoal: 18,
    bab: 'Sistem Saraf',
    materi: 'Sistem Saraf (Mekanisme Gerak Refleks)',
    indikator: 'Menentukan urutan jalannya impuls saraf pada gerak refleks saat menyentuh benda panas.',
    level: 'C3',
    type: 'PG',
    questionText: 'Ketika tangan Ani tanpa sengaja menyentuh wajan yang sangat panas, tangannya langsung ditarik secara spontan sebelum ia menyadari rasa sakitnya. Urutan jalannya impuls saraf pada peristiwa gerak refleks tersebut adalah...',
    options: [
      'Reseptor -> Saraf sensorik -> Otak -> Saraf motorik -> Efektor',
      'Reseptor -> Saraf motorik -> Sumsum tulang belakang -> Saraf sensorik -> Efektor',
      'Reseptor -> Saraf sensorik -> Sumsum tulang belakang (Interneuron) -> Saraf motorik -> Efektor (Otot)',
      'Reseptor -> Otak -> Saraf sensorik -> Sumsum tulang belakang -> Efektor'
    ],
    correctAnswer: 2,
    explanation: 'Gerak refleks tidak melewati otak untuk pengambilan keputusan, melainkan diperantarai oleh Sumsum Tulang Belakang (Medula spinalis) agar respon lebih cepat menghindari cedera. Jalurnya: Reseptor -> Saraf Sensorik -> Interneuron (Sumsum Tulang Belakang) -> Saraf Motorik -> Efektor (Otot).',
    formulaOrConcept: 'Gerak Sadar: Reseptor -> Sensorik -> OTAK -> Motorik -> Efektor | Gerak Refleks: Reseptor -> Sensorik -> SUMSUM TULANG BELAKANG -> Motorik -> Efektor',
    trapWarning: 'Opsi A adalah jalur gerak sadar (melewati otak), bukan gerak refleks!'
  },
  {
    id: 'q23',
    noSoal: 23,
    bab: 'Sistem Reproduksi',
    materi: 'Sistem Reproduksi Wanita (Hormon Reproduksi dan Ovulasi)',
    indikator: 'Menjelaskan peran hormon LH dalam memicu proses ovulasi pada siklus menstruasi.',
    level: 'C2',
    type: 'PG',
    questionText: 'Pada pertengahan siklus menstruasi (sekitar hari ke-14), terjadi pelepasan sel telur (oosit sekunder) yang telah matang dari ovarium (ovulasi). Peristiwa ovulasi ini dipicu secara langsung oleh lonjakan drastis (*surge*) dari hormon...',
    options: [
      'Progesteron',
      'FSH (Follicle Stimulating Hormone)',
      'LH (Luteinizing Hormone)',
      'Estrogen'
    ],
    correctAnswer: 2,
    explanation: 'Lonjakan hormon LH (Luteinizing Hormone) yang dihasilkan kelenjar hipofisis anterior adalah pemicu utama pecahnya folikel Graaf matang untuk melepaskan ovum ke tuba fallopii (proses ovulasi). FSH berperan mematangkan folikel, Estrogen memicu proliferasi dinding rahim, Progesteron mempertahankan ketebalan endometrium.',
    formulaOrConcept: 'FSH = Matangkan Folikel | LH = Picu Ovulasi (Pelepasan Sel Telur) | Estrogen & Progesteron = Tebalkan Dinding Rahim',
    trapWarning: 'FSH menyiapkan sel telur, tapi yang MENEMBAKKAN / MELEPASKAN sel telur adalah LH!'
  },
  {
    id: 'q26',
    noSoal: 26,
    bab: 'Sistem Reproduksi',
    materi: 'Sistem Reproduksi Manusia (Penyakit Menular Seksual)',
    indikator: 'Mengidentifikasi jenis penyakit menular seksual akibat bakteri Treponema pallidum dan penularannya.',
    level: 'C2',
    type: 'PG',
    questionText: 'Penyakit menular seksual yang disebabkan oleh infeksi bakteri berbentuk spiral bernama Treponema pallidum, dengan gejala awal muncul luka pada kelamin tanpa rasa nyeri (chancre), dikenal dengan nama...',
    options: [
      'Gonore (Kencing Nanah)',
      'Sifilis (Raja Singa)',
      'Klamidia',
      'Herpes Genitalis'
    ],
    correctAnswer: 1,
    explanation: 'Treponema pallidum adalah bakteri penyebab Sifilis (sering disebut penyakit Raja Singa). Gonore disebabkan oleh kencing nanah akibat bakteri Neisseria gonorrhoeae. Herpes genitalis disebabkan oleh virus Herpes Simplex (HSV-2).',
    formulaOrConcept: 'Treponema pallidum = Sifilis | Neisseria gonorrhoeae = Gonore | HSV-2 = Herpes Genitalis | HIV = AIDS',
    trapWarning: 'Jangan tertukar antara Sifilis (Treponema pallidum) dengan Gonore (Neisseria gonorrhoeae)!'
  },
  {
    id: 'q32',
    noSoal: 32,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Genotipe dan Fenotipe)',
    indikator: 'Membedakan pengertian genotipe dan fenotipe beserta contohnya dalam pewarisan sifat.',
    level: 'C2',
    type: 'PG',
    questionText: 'Pernyataan berikut yang paling tepat membedakan antara genotipe dan fenotipe adalah...',
    options: [
      'Genotipe adalah sifat yang tampak secara fisik seperti warna kulit, sedangkan fenotipe adalah susunan genetik yang tidak tampak seperti BB atau Bb.',
      'Genotipe adalah susunan materi genetik suatu individu yang disimbolkan dengan huruf (seperti TT atau Tt), sedangkan fenotipe adalah sifat fisik yang teramati (seperti batang tinggi atau bunga merah).',
      'Genotipe dipengaruhi oleh lingkungan luar, sedangkan fenotipe tidak pernah dapat dipengaruhi oleh faktor lingkungan.',
      'Genotipe selalu berwujud gamet haploid, sedangkan fenotipe selalu berwujud zigot diploid.'
    ],
    correctAnswer: 1,
    explanation: 'Genotipe adalah komposisi genetik penyusun sifat yang tidak tampak langsung dan disimbolkan dengan huruf (contoh: BB, Bb, bb). Fenotipe adalah perwujudan fisik dari genotipe yang dapat diamati (contoh: tinggi, pendek, manis, merah). Fenotipe = Genotipe + Pengaruh Lingkungan.',
    formulaOrConcept: 'Genotipe = Simbol Huruf (Genetik) | Fenotipe = Wujud Fisik Terlihat (Mata/Rasa)',
    trapWarning: 'Opsi A sengaja membalik definisi genotipe dan fenotipe!'
  },
  {
    id: 'q33',
    noSoal: 33,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Persilangan Monohibrid Dominansi Penuh)',
    indikator: 'Menentukan perbandingan genotipe dan fenotipe hasil persilangan monohibrid dua individu heterozigot.',
    level: 'C3',
    type: 'PG Kompleks',
    questionText: 'Kacang ercis berbatang tinggi heterozigot (Tt) disilangkan dengan sesamanya (Tt). Sifat tinggi (T) dominan penuh terhadap pendek (t). Manakah DUA pernyataan yang BENAR terkait keturunan F1?',
    options: [
      'Perbandingan genotipe F1 adalah 1 TT : 2 Tt : 1 tt',
      'Perbandingan fenotipe F1 adalah 3 Tinggi : 1 Pendek',
      'Persentase keturunan yang berbatang pendek adalah 50%',
      'Seluruh keturunan F1 memiliki genotipe heterozigot'
    ],
    correctAnswer: [0, 1],
    explanation: 'Persilangan Tt x Tt menghasilkan genotipe: 1 TT, 2 Tt, 1 tt (Rasio Genotipe 1:2:1). Karena T dominan penuh terhadap t, maka TT (tinggi) dan Tt (tinggi) bergabung menjadi 3 bagian fenotipe tinggi, sedangkan tt (pendek) menjadi 1 bagian fenotipe pendek (Rasio Fenotipe 3:1). Persentase pendek = 1/4 = 25%.',
    formulaOrConcept: 'Monohibrid Dominan Penuh (Heterozigot x Heterozigot): Rasio Genotipe = 1 : 2 : 1 | Rasio Fenotipe = 3 : 1',
    trapWarning: 'Pada dominansi penuh, genotipe Tt berfenotipe Tinggi (sama dengan TT), bukan sedang!'
  },
  {
    id: 'q34',
    noSoal: 34,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Persilangan Monohibrid Intermediet)',
    indikator: 'Menganalisis pola pewarisan sifat intermediet pada bunga pukul empat.',
    level: 'C3',
    type: 'Benar-Salah',
    questionText: 'Bunga pukul empat (Mirabilis jalapa) merah (MM) disilangkan dengan putih (mm) menghasilkan F1 seluruhnya merah muda (Mm). Jika F1 disilangkan sesamanya, rasio fenotipe F2 adalah 1 Merah : 2 Merah Muda : 1 Putih.',
    options: ['Benar', 'Salah'],
    correctAnswer: 0, // Benar
    explanation: 'BENAR. Pada persilangan sifat intermediet (kodominan/semidominan), gen dominan M tidak menutupi total alel resesif m, melainkan menghasilkan sifat perantara (Merah Muda). Pada F2 (Mm x Mm), rasio genotipe 1 MM : 2 Mm : 1 mm menghasilkan rasio FENOTIPE yang SAMA yaitu 1 Merah : 2 Merah Muda : 1 Putih.',
    formulaOrConcept: 'Ciri Khas Intermediet: Rasio Genotipe = Rasio Fenotipe (1 : 2 : 1)',
    trapWarning: 'Bedakan dengan dominan penuh yang rasio fenotipenya 3 : 1.'
  },
  {
    id: 'q38',
    noSoal: 38,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Pewarisan Golongan Darah Sistem ABO)',
    indikator: 'Menentukan kemungkinan golongan darah keturunan dari perkawinan dengan golongan darah tertentu.',
    level: 'C3',
    type: 'PG',
    questionText: 'Seorang laki-laki bergolongan darah A heterozigot (I^A I^O) menikah dengan seorang perempuan bergolongan darah B heterozigot (I^B I^O). Berapa persen kemungkinan anak mereka lahir dengan golongan darah O?',
    options: [
      '100%',
      '50%',
      '25%',
      '0%'
    ],
    correctAnswer: 2,
    explanation: 'Gamet Ayah: I^A, I^O. Gamet Ibu: I^B, I^O. Kombinasi anak: 1) I^A I^B (Golongan AB, 25%), 2) I^A I^O (Golongan A, 25%), 3) I^B I^O (Golongan B, 25%), 4) I^O I^O (Golongan O, 25%). Jadi kemungkinan anak bergolongan darah O adalah 25%.',
    formulaOrConcept: 'Golongan A heterozigot (I^A I^O) x Golongan B heterozigot (I^B I^O) bisa menghasilkan SEMUA jenis golongan darah (A, B, AB, O) masing-masing 25%!',
    trapWarning: 'Banyak yang mengira orang tua golongan A dan B tidak mungkin punya anak golongan O. Justru jika keduanya heterozigot, anak bergolongan darah O peluangnya 25%!'
  },
  {
    id: 'q39',
    noSoal: 39,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Kelainan Genetik Autosomal Resesif)',
    indikator: 'Menghitung peluang munculnya keturunan albino dari orang tua normal heterozigot.',
    level: 'C3',
    type: 'PG',
    questionText: 'Sepasang suami istri keduanya memiliki kulit normal, namun masing-masing merupakan pembawa sifat (*carrier*) gen albino (Aa). Berapakah peluang anak pertama mereka lahir dengan kondisi albino?',
    options: [
      '75%',
      '50%',
      '25%',
      '12,5%'
    ],
    correctAnswer: 2,
    explanation: 'Albino adalah sifat autosomal resesif (aa). Persilangan: Aa x Aa -> Keturunan: 1 AA (Normal homozigot, 25%), 2 Aa (Normal carrier, 50%), 1 aa (Albino, 25%). Peluang anak lahir albino = 1/4 = 25%.',
    formulaOrConcept: 'Carrier (Aa) x Carrier (Aa) -> 75% Normal (AA & Aa), 25% Albino (aa)',
    trapWarning: 'Perhatikan apakah yang ditanyakan peluang anak "normal" (75%) atau anak "albino" (25%).'
  },
  {
    id: 'q40',
    noSoal: 40,
    bab: 'Pewarisan Sifat',
    materi: 'Pewarisan Sifat (Penyakit Menurun Terpaut Kromosom X)',
    indikator: 'Menganalisis alasan laki-laki lebih berpeluang mengalami hemofilia dibandingkan perempuan.',
    level: 'C4',
    type: 'PG',
    questionText: 'Hemofilia adalah penyakit menurun di mana darah sulit membeku akibat gen resesif yang terpaut pada kromosom X (X^h). Mengapa laki-laki secara genetik memiliki peluang menderita hemofilia yang jauh lebih besar dibandingkan perempuan?',
    options: [
      'Kromosom Y pada laki-laki mengaktifkan mutasi pada gen hemofilia.',
      'Laki-laki hanya memiliki satu kromosom X (XY), sehingga bila menerima kromosom X yang membawa gen hemofilia (X^hY) langsung menderita hemofilia tanpa ada alel normal penutup.',
      'Perempuan memiliki hormon estrogen yang dapat memperbaiki faktor pembekuan darah yang rusak.',
      'Gen hemofilia pada perempuan selalu bermutasi menjadi gen dominan.'
    ],
    correctAnswer: 1,
    explanation: 'Laki-laki bersifat hemizigot karena hanya memiliki satu kromosom X (XY). Jika ia mewarisi satu alel X^h dari ibunya, ia langsung menjadi penderita (X^hY) karena kromosom Y tidak membawa gen tandingan. Sementara perempuan memiliki dua kromosom X (XX), sehingga baru menjadi penderita jika menerima dua gen resesif (X^hX^h); bila hanya satu (X^HX^h) ia berstatus pembawa (carrier) dan tetap hidup normal.',
    formulaOrConcept: 'Laki-laki: XY (Normal) atau X^hY (Penderita hemofilia, TIDAK ADA status carrier). Perempuan: X^H X^H (Normal), X^H X^h (Carrier/Normal), X^h X^h (Penderita hemofilia/Letal).',
    trapWarning: 'Laki-laki TIDAK BISA menjadi carrier hemofilia. Laki-laki hanya punya 2 status: Normal atau Penderita.'
  }
];

export const IPA_CHEAT_SHEETS: CheatSheetTopic[] = [
  {
    id: 'cs1',
    bab: 'Listrik Statis',
    title: 'Ringkasan Cepat & Trik Rumus Listrik Statis',
    coreConcepts: [
      'Hanya ELEKTRON (negatif) yang bisa berpindah tempat. Proton tidak pernah berpindah.',
      'Benda digosok: Plastik + Kain Wol -> Elektron Wol pindah ke Plastik (Plastik Negatif). Kaca + Kain Sutra -> Elektron Kaca pindah ke Sutra (Kaca Positif).',
      'Muatan Sejenis -> Tolak-menolak. Berbeda Jenis -> Tarik-menarik.',
      'Garis gaya listrik: Keluar dari muatan Positif (+) dan Masuk ke muatan Negatif (-). Kerapatan garis menunjukkan kuatnya medan listrik.',
      'Penangkal petir: Menggunakan ujung runcing logam tembaga agar muatan listrik petir disalurkan langsung secara aman ke tanah (grounding).'
    ],
    keyFormulas: [
      {
        name: 'Hukum Coulomb',
        formula: 'F = k * (q1 * q2) / r^2',
        notes: 'F berbanding lurus dengan muatan (q), dan berbanding terbalik dengan kuadrat jarak (r^2). Nilai k = 9 x 10^9 N.m^2/C^2.'
      },
      {
        name: 'Medan Listrik',
        formula: 'E = F / q = k * Q / r^2',
        notes: 'E dalam N/C. Q = muatan sumber, r = jarak ke titik pengamatan.'
      },
      {
        name: 'Beda Potensial Listrik',
        formula: 'V = W / q',
        notes: 'V = Beda potensial (Volt), W = Energi (Joule), q = Muatan (Coulomb).'
      }
    ],
    commonTraps: [
      'Lupa mengkuadratkan jarak (r) pada Hukum Coulomb.',
      'Mengira proton bisa berpindah saat penggosokan (SALAH, hanya elektron yang bergerak).',
      'Tertukar muatan kaca vs penggaris plastik.'
    ],
    mnemonic: 'P-W-N: Plastik dengan Wol jadi Negatif! K-S-P: Kaca dengan Sutra jadi Positif!'
  },
  {
    id: 'cs2',
    bab: 'Listrik Dinamis',
    title: 'Rumus Cepat & Hukum Rangkaian Listrik Dinamis',
    coreConcepts: [
      'Arus listrik mengalir dari potensial tinggi (kutub +) ke rendah (kutub -), sedangkan aliran elektron sebaliknya (dari - ke +).',
      'Hukum I Kirchhoff: Jumlah kuat arus masuk pada suatu percabangan = jumlah kuat arus yang keluar.',
      'Rangkaian Seri: Arus sama di setiap hambatan (I total = I1 = I2), Tegangan terbagi (V total = V1 + V2).',
      'Rangkaian Paralel: Tegangan sama di setiap cabang (V total = V1 = V2), Arus terbagi (I total = I1 + I2). Penggunaan di rumah menggunakan paralel agar jika 1 lampu mati, lampu lain tetap menyala.'
    ],
    keyFormulas: [
      {
        name: 'Kuat Arus Listrik',
        formula: 'I = Q / t',
        notes: 'I dalam Ampere, Q dalam Coulomb, t dalam Detik/Sekon (konversi menit ke detik dulu!).'
      },
      {
        name: 'Hukum Ohm',
        formula: 'V = I * R',
        notes: 'Segitiga V-I-R: V = I*R, I = V/R, R = V/I.'
      },
      {
        name: 'Hambatan Seri vs Paralel',
        formula: 'Rs = R1 + R2 | 1/Rp = 1/R1 + 1/R2',
        notes: 'Hasil akhir pecahan paralel harus dibalik untuk mendapat nilai Rp!'
      },
      {
        name: 'Daya Listrik',
        formula: 'P = V * I = I^2 * R = V^2 / R',
        notes: 'P dalam Watt. Energi listrik: W = P * t (dalam Joule atau kWh).'
      }
    ],
    commonTraps: [
      'Menghitung waktu I = Q/t masih dalam menit, harus dikali 60 ke detik!',
      'Hasil 1/Rp lupa dibalik.',
      'Mengira rangkaian rumah tangga dipasang seri (salah, rumah selalu dipasang paralel).'
    ],
    mnemonic: 'V-I-R: "Vina Imut Ramah" -> V di atas, I dan R berdampingan di bawah!'
  },
  {
    id: 'cs3',
    bab: 'Sistem Saraf & Koordinasi',
    title: 'Peta Konsep Sistem Saraf & Refleks',
    coreConcepts: [
      'Neuron (Sel Saraf): Dendrit (menerima impuls) -> Badan Sel -> Akson/Neurit (meneruskan impuls) -> Selubung Mielin (isolator & pelindung akson) -> Nodus Ranvier (mempercepat loncatan impuls).',
      'Otak Besar (Cerebrum): Pusat berpikir, kemauan, kesadaran, dan sensor pancaindra.',
      'Otak Kecil (Cerebellum): Pusat koordinasi gerak otot dan KESEIMBANGAN tubuh.',
      'Sumsum Lanjutan (Medula Oblongata): Pusat gerak tak sadar vital (denyut jantung, pernapasan, bersin, batuk).',
      'Gerak Sadar: Reseptor -> Saraf Sensorik -> OTAK -> Saraf Motorik -> Efektor.',
      'Gerak Refleks: Reseptor -> Saraf Sensorik -> SUMSUM TULANG BELAKANG (Interneuron) -> Saraf Motorik -> Efektor (respon instan tanpa dipikir).',
      'Kelainan Parkinson: Kerusakan sel saraf di substansia nigra otak yang memproduksi neurotransmitter DOPAMIN, menyebabkan tremor dan kekakuan otot.'
    ],
    commonTraps: [
      'Menjawab gerak refleks diolah oleh otak (SALAH, gerak refleks jalan pintasnya sumsum tulang belakang).',
      'Tertukar Cerebrum (Otak Besar / Pikiran) dengan Cerebellum (Otak Kecil / Keseimbangan).'
    ],
    mnemonic: 'KECIL-KESEIMBANGAN: Cerebellum = Otak Kecil = Keseimbangan!'
  },
  {
    id: 'cs4',
    bab: 'Sistem Reproduksi Manusia',
    title: 'Organ, Siklus Hormon & Fertilisasi',
    coreConcepts: [
      'Organ Pria: Testis (penghasil sperma & hormon testosteron), Epididimis (tempat pematangan & penyimpanan sperma sementara), Vas Deferens (saluran sperma), Uretra.',
      'Spermatogenesis membutuhkan suhu 2-3 derajat Celcius LEBIH RENDAH dari suhu tubuh, itulah mengapa testis berada di luar rongga tubuh dalam skrotum.',
      'Organ Wanita: Ovarium (penghasil ovum, estrogen, progesteron), Tuba Fallopii / Oviduk (tempat terjadinya FERTILISASI / pembuahan), Uterus / Rahim (tempat implantasi dan perkembangan janin).',
      'Hormon Siklus Menstruasi: FSH (mematangkan folikel di ovarium) -> LH (lonjakannya memicu OVULASI pada hari ke-14) -> Estrogen & Progesteron (menebalkan dinding endometrium rahim untuk persiapan kehamilan).',
      'Plasenta: Organ pertukaran nutrisi, oksigen, dan zat sisa antara darah ibu dan janin via tali pusar.',
      'Penyakit Menular Seksual (PMS): Sifilis (Treponema pallidum - bakteri spiral), Gonore (Neisseria gonorrhoeae - bakteri kencing nanah), Herpes Genitalis (HSV-2 - virus).'
    ],
    commonTraps: [
      'Fertilisasi terjadi di rahim (SALAH, fertilisasi terjadi di Tuba Fallopii / Oviduk, rahim hanya tempat janin tumbuh).',
      'Menjawab hormon pemicu ovulasi adalah estrogen (SALAH, pemicu ovulasi langsung adalah hormon LH!).'
    ],
    mnemonic: 'L-H = "Lepaskan H-ovum" (LH memicu pelepasan telur/ovulasi)!'
  },
  {
    id: 'cs5',
    bab: 'Pewarisan Sifat (Genetika)',
    title: 'Hukum Mendel, Persilangan & Penyakit Menurun',
    coreConcepts: [
      'Sentromer: Bagian kepala kromosom yang menghubungkan kromatid kembar dan tempat melekatnya benang spindel saat pembelahan sel.',
      'Genotipe = Susunan genetik yang disimbolkan huruf (TT, Tt, tt). Fenotipe = Sifat fisik yang teramati (Tinggi, Manis, Merah).',
      'Monohibrid Dominan Penuh (Heterozigot x Heterozigot): Rasio Genotipe 1:2:1, Rasio Fenotipe 3:1.',
      'Monohibrid Intermediet (Merah x Putih -> F1 Merah Muda): Rasio Fenotipe F2 = 1 Merah : 2 Merah Muda : 1 Putih (Rasio fenotipe sama dengan rasio genotipe 1:2:1).',
      'Dihibrid Heterozigot (BbKk x BbKk): Rasio Fenotipe F2 = 9 : 3 : 3 : 1.',
      'Golongan Darah ABO: Golongan A (I^A I^A atau I^A I^O), B (I^B I^B atau I^B I^O), AB (I^A I^B), O (I^O I^O). Orang tua A heterozigot x B heterozigot bisa punya anak bergolongan darah A, B, AB, dan O (masing-masing 25%).',
      'Albino: Autosomal resesif (aa). Orang tua carrier (Aa x Aa) memiliki peluang anak albino sebesar 25%.',
      'Hemofilia & Buta Warna: Terpaut kromosom X resesif (X^h atau X^cb). Laki-laki hanya punya 1 kromosom X (XY), sehingga jika menerima X^h langsung menjadi penderita (tidak ada laki-laki carrier!).'
    ],
    commonTraps: [
      'Mengira laki-laki bisa menjadi carrier hemofilia (SALAH, pria cuma punya 1 kromosom X, jadi hanya ada pria Normal atau Pria Penderita).',
      'Salah menghitung peluang albino dari orang tua carrier (Peluang albino = 1/4 = 25%).'
    ],
    mnemonic: 'Dihibrid F2: 9 (Dominan-Dominan), 3 (Dominan-Resesif), 3 (Resesif-Dominan), 1 (Resesif-Resesif)!'
  }
];

export const DEFAULT_SUBJECT: Subject = {
  id: 'ipa-ix-sem1',
  name: 'IPA (Ilmu Pengetahuan Alam)',
  grade: 'Kelas IX (Sembilan)',
  academicYear: '2026/2027',
  examDate: 'Senin, 23 November 2026',
  color: 'from-emerald-500 to-teal-700',
  icon: 'Atom',
  kisiKisi: IPA_KISI_KISI,
  questions: IPA_QUESTIONS,
  cheatSheets: IPA_CHEAT_SHEETS
};
