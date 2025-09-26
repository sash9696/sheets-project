


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

// Track dependencies (which cells depend on which others)
function addDependency(parentAddress, childAddress) {
    const [parentRow, parentCol] = parseCellAddress(parentAddress);
    const parentData = getCellData(parentRow, parentCol);
    
    if (!parentData.dependents.includes(childAddress)) {
        parentData.dependents.push(childAddress);
    }
}

function removeDependency(parentAddress, childAddress) {
    const [parentRow, parentCol] = parseCellAddress(parentAddress);
    const parentData = getCellData(parentRow, parentCol);
    
    const index = parentData.dependents.indexOf(childAddress);
    if (index > -1) {
        parentData.dependents.splice(index, 1);
    }
}

// Parse cell address to row/col
function parseCellAddress(address) {
    const match = address.match(/^([A-Z]+)(\d+)$/);
    if (!match) return [0, 0];
    
    const [, colStr, rowStr] = match;
    const row = parseInt(rowStr) - 1;
    
    // Convert column letters to number
    let col = 0;
    for (let i = 0; i < colStr.length; i++) {
        col = col * 26 + (colStr.charCodeAt(i) - 64);
    }
    col -= 1;
    
    return [row, col];
}

// Extract dependencies from formula
function extractDependencies(formula) {
    const cellRefRegex = /[A-Z]+\d+/g;
    return formula.match(cellRefRegex) || [];
}

// Recalculate all cells that depend on the changed cell
function recalculateDependents(changedAddress) {
    const [changedRow, changedCol] = parseCellAddress(changedAddress);
    const changedData = getCellData(changedRow, changedCol);
    
    // Recalculate all dependent cells
    changedData.dependents.forEach(depAddress => {
        const [depRow, depCol] = parseCellAddress(depAddress);
        const depData = getCellData(depRow, depCol);
        
        if (depData.formula) {
            const newResult = FormulaEngine.evaluateFormula(depData.formula);
            depData.value = newResult;
            updateCellUI(depRow, depCol, newResult);
            
            // Recursively recalculate their dependents
            recalculateDependents(depAddress);
        }
    });
}

function setCellFormula(row, col, formula) {
    const cellData = getCellData(row, col);
    const address = getCellAddress(row, col);
    
    // Check for cycles BEFORE setting the formula
    if (CycleDetection.wouldCreateCycle(formula, address)) {
        alert('⚠️ CYCLE DETECTED! This formula would create a circular dependency.');
        console.log('Cycle detected, formula rejected:', formula);
        return false; // Don't set the formula
    }
    
    // Remove old dependencies
    if (cellData.formula) {
        const oldDeps = extractDependencies(cellData.formula);
        oldDeps.forEach(dep => removeDependency(dep, address));
    }
    
    // Set new formula (safe now)
    cellData.formula = formula;
    
    // Add new dependencies
    const newDeps = extractDependencies(formula);
    newDeps.forEach(dep => addDependency(dep, address));
    
    // Evaluate and update
    const result = FormulaEngine.evaluateFormula(formula);
    cellData.value = result;
    updateCellUI(row, col, result);
    
    // Trigger recalculation of dependent cells
    recalculateDependents(address);
    
    console.log(`Cell [${row},${col}] formula set: ${formula} = ${result}`);
    return true; // Success
}
  


window.CellManager = {
    getCellData,
    setCellValue,
    setCellFormula,
    createCellData,
    addDependency,
    removeDependency,
    recalculateDependents
};