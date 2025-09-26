// Enhanced file operations
function saveWorkbook() {
    const workbookData = {
        sheets: dataState.sheets,
        currentSheet: dataState.currentSheet,
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        name: "Excel Clone Pro Workbook"
    };
    
    const dataStr = JSON.stringify(workbookData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `excel-clone-${timestamp}.json`;
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = filename;
    link.click();
    
    console.log('Workbook saved:', filename);
}

// Add Excel-like download (CSV format)
function downloadAsCSV() {
    let csvContent = '';
    
    // Get current sheet data
    const currentSheet = dataState.sheets[dataState.currentSheet];
    
    for (let row = 0; row < 100; row++) {
        const rowData = [];
        for (let col = 0; col < 26; col++) {
            const cellData = currentSheet[row][col];
            const value = cellData.value || '';
            // Escape commas and quotes for CSV
            const escapedValue = value.toString().replace(/"/g, '""');
            rowData.push(`"${escapedValue}"`);
        }
        csvContent += rowData.join(',') + '\n';
    }
    
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `excel-clone-${timestamp}.csv`;
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvBlob);
    link.download = filename;
    link.click();
    
    console.log('CSV downloaded:', filename);
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
    loadWorkbook,
    downloadAsCSV
};
