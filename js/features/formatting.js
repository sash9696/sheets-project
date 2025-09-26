function applyBold(row, col, bold) {
    const cellData = CellManager.getCellData(row, col);
    cellData.formatting.bold = bold;
    updateCellFormatting(row, col);
}

function applyItalic(row, col, italic) {
    const cellData = CellManager.getCellData(row, col);
    cellData.formatting.italic = italic;
    updateCellFormatting(row, col);
}

function applyFontSize(row, col, fontSize) {
    const cellData = CellManager.getCellData(row, col);
    cellData.formatting.fontSize = fontSize;
    updateCellFormatting(row, col);
}

function applyFontColor(row, col, color) {
    const cellData = CellManager.getCellData(row, col);
    cellData.formatting.fontColor = color;
    updateCellFormatting(row, col);
}

function applyBackgroundColor(row, col, color) {
    const cellData = CellManager.getCellData(row, col);
    cellData.formatting.backgroundColor = color;
    updateCellFormatting(row, col);
}

// Update cell formatting in UI
function updateCellFormatting(row, col) {
    const address = getCellAddress(row, col);
    const cell = gridState.cells.get(address);
    const cellData = CellManager.getCellData(row, col);
    
    if (cell) {
        const { formatting } = cellData;
        
        cell.style.fontWeight = formatting.bold ? 'bold' : 'normal';
        cell.style.fontStyle = formatting.italic ? 'italic' : 'normal';
        cell.style.fontSize = formatting.fontSize + 'px';
        cell.style.color = formatting.fontColor;
        cell.style.backgroundColor = formatting.backgroundColor === '#ffffff' ? 'transparent' : formatting.backgroundColor;
    }
}

window.FormattingManager = {
    applyBold,
    applyItalic,
    applyFontSize,
    applyFontColor,
    applyBackgroundColor
};