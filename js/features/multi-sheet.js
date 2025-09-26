// Multi-sheet management
let sheetCounter = 1;

// Create a new sheet
function createNewSheet() {
    const newSheet = createSheetData();
    dataState.sheets.push(newSheet);
    dataState.currentSheet = dataState.sheets.length - 1;
    
    // Create sheet tab
    addSheetTab(dataState.currentSheet);
    
    // Clear the grid
    clearGrid();
    
    console.log(`Created new sheet: Sheet ${sheetCounter}`);
    sheetCounter++;
}

// Add sheet tab to UI
function addSheetTab(sheetIndex) {
    const tabsContainer = document.querySelector('.sheet-tabs-container');
    const sheetTab = document.createElement('div');
    sheetTab.className = 'sheet-tab';
    sheetTab.dataset.sheet = sheetIndex;
    sheetTab.textContent = `Sheet ${sheetIndex + 1}`;
    
    // Add click handler
    sheetTab.addEventListener('click', () => switchToSheet(sheetIndex));
    
    tabsContainer.appendChild(sheetTab);
}

// Switch to a different sheet
function switchToSheet(sheetIndex) {
    // Update active tab
    document.querySelectorAll('.sheet-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`[data-sheet="${sheetIndex}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update current sheet
    dataState.currentSheet = sheetIndex;
    
    // Refresh grid with new sheet data
    refreshGrid();
    
    console.log(`Switched to sheet ${sheetIndex + 1}`);
}

// Clear the grid
function clearGrid() {
    for (let row = 0; row < 100; row++) {
        for (let col = 0; col < 26; col++) {
            const address = getCellAddress(row, col);
            const cell = gridState.cells.get(address);
            if (cell) {
                cell.textContent = '';
                cell.style.backgroundColor = '';
                cell.style.fontWeight = 'normal';
                cell.style.fontStyle = 'normal';
                cell.style.color = '#000000';
                cell.style.textAlign = 'left';
            }
        }
    }
}

// Refresh grid with current sheet data
function refreshGrid() {
    const currentSheet = dataState.sheets[dataState.currentSheet];
    
    for (let row = 0; row < 100; row++) {
        for (let col = 0; col < 26; col++) {
            const cellData = currentSheet[row][col];
            const address = getCellAddress(row, col);
            const cell = gridState.cells.get(address);
            
            if (cell) {
                // Use the cell manager's formatting function
                updateCellUIWithFormatting(row, col, cellData.value, cellData.formatting);
            }
        }
    }
}


// Export functions
window.MultiSheetManager = {
    createNewSheet,
    switchToSheet,
    refreshGrid
};
