// File save/load functionality
function saveWorkbook() {
    const workbookData = {
        sheets: dataState.sheets,
        currentSheet: dataState.currentSheet,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(workbookData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'workbook.json';
    link.click();
    
    console.log('Workbook saved');
}

function loadWorkbook(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const workbookData = JSON.parse(e.target.result);
            dataState.sheets = workbookData.sheets;
            dataState.currentSheet = workbookData.currentSheet;
            
            // Refresh UI
            refreshGrid();
            console.log('Workbook loaded');
        } catch (error) {
            console.error('Error loading workbook:', error);
            alert('Error loading file. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

function refreshGrid() {
    // Update all cells with current data
    for (let row = 0; row < 100; row++) {
        for (let col = 0; col < 26; col++) {
            const cellData = CellManager.getCellData(row, col);
            const address = getCellAddress(row, col);
            const cell = gridState.cells.get(address);
            if (cell) {
                cell.textContent = cellData.value;
                FormattingManager.updateCellFormatting(row, col);
            }
        }
    }
}

// Export functions
window.FileManager = {
    saveWorkbook,
    loadWorkbook
};
