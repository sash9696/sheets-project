// Copy/paste functionality
let clipboard = null;

function copySelection() {
    if (!gridState.activeCell) return;
    
    const { row, col } = gridState.activeCell;
    const cellData = CellManager.getCellData(row, col);
    
    clipboard = {
        value: cellData.value,
        formula: cellData.formula,
        formatting: { ...cellData.formatting }
    };
    
    console.log('Cell copied to clipboard');
}

function pasteSelection() {
    if (!clipboard || !gridState.activeCell) return;
    
    const { row, col } = gridState.activeCell;
    
    // Paste value
    if (clipboard.formula) {
        CellManager.setCellFormula(row, col, clipboard.formula);
    } else {
        CellManager.setCellValue(row, col, clipboard.value);
    }
    
    // Apply formatting
    const cellData = CellManager.getCellData(row, col);
    Object.assign(cellData.formatting, clipboard.formatting);
    FormattingManager.updateCellFormatting(row, col);
    
    console.log('Cell pasted from clipboard');
}

// Export functions
window.CopyPasteManager = {
    copySelection,
    pasteSelection
};
