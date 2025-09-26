

const GRID_CONFIG = {
    ROWS:100,
    COLS:26,
    CELL_HEIGHT:30,
    CELL_WIDTH:100,
};


let gridState = {
    activeCell: null,
    selectedRange: [],
    cells: new Map()
};


function initializeGrid() {
    console.log('Initializing grid...');
    createColumnHeaders();
    createRowNumbers();
    createCells();
    setupEventListeners();
    console.log('Grid initialized successfully!');

};

// Create column headers (A, B, C, ...)

function createColumnHeaders() {
    const container = document.querySelector('.column-headers');

    if (!container) {
        console.error('Column headers container not found!');
        return;
    }

    for(let i = 0; i < GRID_CONFIG.COLS; i++) {
        const header = document.createElement('div');
        header.classList = 'column-header';
        header.textContent = String.fromCharCode(65 + i);
        container.appendChild(header);
    }
    console.log(`Created ${GRID_CONFIG.COLS} column headers`);

}

// Create row numbers (1, 2, 3, ...)
function createRowNumbers() {
    const container = document.querySelector('.row-numbers');
    if (!container) {
        console.error('Row numbers container not found!');
        return;
    }
    
    for (let i = 1; i <= GRID_CONFIG.ROWS; i++) {
        const rowNum = document.createElement('div');
        rowNum.className = 'row-number';
        rowNum.textContent = i;
        container.appendChild(rowNum);
    }
    console.log(`Created ${GRID_CONFIG.ROWS} row numbers`);
}

// Create cell grid
function createCells() {
    const container = document.querySelector('.cells-container');
    if (!container) {
        console.error('Cells container not found!');
        return;
    }
    
    for (let row = 0; row < GRID_CONFIG.ROWS; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'cell-row';
        
        for (let col = 0; col < GRID_CONFIG.COLS; col++) {
            const cell = createCell(row, col);
            rowElement.appendChild(cell);
        }
        container.appendChild(rowElement);
    }
    console.log(`Created ${GRID_CONFIG.ROWS * GRID_CONFIG.COLS} cells`);
}
// Create individual cell
function createCell(row, col) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.contentEditable = true;
    
    // Store cell reference
    const address = getCellAddress(row, col);
    gridState.cells.set(address, cell);
    
    return cell;
}

// Get cell address (A1, B2, etc.)
function getCellAddress(row, col) {
    return String.fromCharCode(65 + col) + (row + 1);
}

// Setup grid event listeners
function setupEventListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('blur', handleCellBlur);
        cell.addEventListener('keydown', handleCellKeydown);
    });
    console.log('Event listeners attached to all cells');
}

function handleCellClick(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    setActiveCell(row, col);
    updateAddressBar(getCellAddress(row, col));
    
    // Show cell data in formula bar
    const data = CellManager.getCellData(row, col);
    const formulaInput = document.querySelector('.formula-input');
    if (formulaInput) formulaInput.value = data.formula || data.value || '';
    
    // Update toolbar to show current formatting
    updateToolbarFormatting(data.formatting);
}

function updateToolbarFormatting(formatting) {
    const boldBtn = document.querySelector('[data-action="bold"]');
    if (boldBtn) boldBtn.classList.toggle('active', formatting.bold);
    
    const italicBtn = document.querySelector('[data-action="italic"]');
    if (italicBtn) italicBtn.classList.toggle('active', formatting.italic);

    const fontSizeSel = document.querySelector('.font-size');
    if (fontSizeSel) fontSizeSel.value = String(formatting.fontSize);

    const fontFamilySel = document.querySelector('.font-family');
    if (fontFamilySel) fontFamilySel.value = formatting.fontFamily;

    const fontColorInp = document.querySelector('.font-color');
    if (fontColorInp) fontColorInp.value = formatting.fontColor;

    const bgColorInp = document.querySelector('.background-color');
    if (bgColorInp) bgColorInp.value = formatting.backgroundColor;
}

// Set active cell
function setActiveCell(row, col) {
    // Remove previous active cell styling
    const prevActive = document.querySelector('.cell.active');
    if (prevActive) {
        prevActive.classList.remove('active');
    }
    
    // Set new active cell
    const address = getCellAddress(row, col);
    const cell = gridState.cells.get(address);
    if (cell) {
        cell.classList.add('active');
        gridState.activeCell = { row, col, address };
    }
}

// Update address bar
function updateAddressBar(address) {
    const addressInput = document.querySelector('.address-input');
    if (addressInput) {
        addressInput.value = address;
    }
}


// Handle cell blur (when cell loses focus)
function handleCellBlur(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const address = getCellAddress(row, col);
    
    // Update cell value in data model
    updateCellValue(address, cell.textContent);
    console.log(`Cell value updated: ${address} = "${cell.textContent}"`);
}

function handleCellKeydown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        // Move to next row or handle formula
        handleEnterKey();
    }
}

function handleEnterKey() {
    if (!gridState.activeCell) return;
    
    const { row, col } = gridState.activeCell;
    const nextRow = Math.min(row + 1, GRID_CONFIG.ROWS - 1);
    setActiveCell(nextRow, col);
    updateAddressBar(getCellAddress(nextRow, col));
}

function updateCellValue(address, value) {
    const row = parseInt(address.slice(1), 10) - 1;
    const col = address.charCodeAt(0) - 65;
    CellManager.setCellValue(row, col, value);
  }


window.GridManager = {
    initializeGrid,
    getCellAddress,
    setActiveCell,
    updateCellValue,
    GRID_CONFIG
}