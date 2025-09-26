function isFormula(input) {
    return typeof input === 'string' && input.startsWith('=');
  }
  
  function parseCellAddress(address) {
    const m = address.match(/^([A-Z]+)(\d+)$/);
    if (!m) return [0, 0];
    const [, colStr, rowStr] = m;
    const row = parseInt(rowStr, 10) - 1;
    let col = 0;
    for (let i = 0; i < colStr.length; i++) col = col * 26 + (colStr.charCodeAt(i) - 64);
    return [row, col - 1];
  }
  
  function replaceCellRefs(expression) {
    return expression.replace(/[A-Z]+[0-9]+/g, (ref) => {
      const [r, c] = parseCellAddress(ref);
      const cell = CellManager.getCellData(r, c);
      const v = (cell?.value ?? '');
      return String(v || 0);
    });
  }
  
  function evaluateFormula(formula) {
    const expr = formula.slice(1); // drop '='
    const replaced = replaceCellRefs(expr);
    if (!/^[0-9+\-*/().\s]+$/.test(replaced)) return '#ERR';
    try { return new Function('return ' + replaced)(); } catch { return '#ERR'; }
  }
  
  window.FormulaEngine = { isFormula, evaluateFormula };