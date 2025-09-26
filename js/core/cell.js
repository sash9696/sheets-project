


// Cell data structure
const createCellData = () => ({
    value: '',
    formula: '',
    formatting: {
        bold: false,
        italic: false,
        underline: false,
        fontFamily: 'Arial',
        fontSize: 14,
        fontColor: '#000000',
        backgroundColor: '#ffffff',
        textAlign: 'left'
    },
    dependencies: [],
    dependents: []
});


const createSheetData = () => {
    const sheet = [];

    for(let row  = 0; row < 100; row++) {
        const rowData = []
        for (let col = 0; col < 26; col++) {
            rowData.push(createCellData());
        }
        sheet.push(rowData);
    }

    return sheet;
}

// Global data state
let dataState = {
    currentSheet: 0,
    sheets: [createSheetData()],
    dependencyGraph: []
};

function getCellData(row, col, sheetIndex = dataState.currentSheet) {
    return dataState.sheets[sheetIndex][row][col];
}

function setCellValue(row, col, value, sheetIndex = dataState.currentSheet) {
    const cellData = getCellData(row, col, sheetIndex);
    cellData.value = value;
    cellData.formula = ''; // Clear formula when setting direct value
    
    // Update UI
    updateCellUI(row, col, value);
    console.log(`Cell [${row},${col}] value set to: "${value}"`);
}

function updateCellUI(row, col, value) {
    const address = getCellAddress(row, col);
    const cell = gridState.cells.get(address);
    if (cell) {
        cell.textContent = value;
    }
}

function setCellFormula(row, col, formula) {
    const cellData = getCellData(row, col);
    cellData.formula = formula;
    const result = FormulaEngine.evaluateFormula(formula);
    setCellValue(row, col, result);
  }
  


window.CellManager = {
    getCellData,
    setCellValue,
    createCellData,
    setCellFormula
};