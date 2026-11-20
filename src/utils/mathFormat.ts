export function cleanMathText(text: string): string {
  if (!text) return '';

  return text
    // Replace \frac{a}{b} with (a / b)
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1 / $2)')
    // Replace \times with ×
    .replace(/\\times/g, '×')
    // Replace \cdot with ·
    .replace(/\\cdot/g, '·')
    // Replace \approx with ≈
    .replace(/\\approx/g, '≈')
    // Replace \left( and \right)
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    // Replace \left[ and \right]
    .replace(/\\left\[/g, '[')
    .replace(/\\right\]/g, ']')
    // Replace \propto with berbanding lurus (∝)
    .replace(/\\propto/g, '∝')
    // Replace subscripts like q_{1} or q_{11} with q1, q11
    .replace(/_\{([^{}]+)\}/g, '$1')
    .replace(/_([a-zA-Z0-9])/g, '$1')
    // Replace exponents like ^2 or ^{2} with ^2
    .replace(/\^\{([^{}]+)\}/g, '^$1')
    // Remove double dollars $$ and single dollars $
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    // Clean up excessive backslashes
    .replace(/\\([a-zA-Z]+)/g, '$1');
}
