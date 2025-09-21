

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


window.GridManager = {
    initializeGrid
}