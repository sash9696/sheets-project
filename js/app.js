


class SheetsApp {
    constructor() {

        this.initializeApp();

    }

    initializeApp() {
        console.log('Starting Excel Clone Pro...');
        this.initializeGrid();
        this.setupEventListeners();
        console.log('App initialized successfully!');
        GridManager.setActiveCell(0, 0);
        document.querySelector('.address-input').value = 'A1';
    }

    initializeGrid(){
        if (window.GridManager) {
            GridManager.initializeGrid();
        } else {
            console.error('GridManager not found!');
        }
    }

    setupEventListeners() {
        // Formula bar events
        const formulaInput = document.querySelector('.formula-input');
        if (formulaInput) {
            formulaInput.addEventListener('keydown', this.handleFormulaKeydown.bind(this));
        }
        
        this.setupToolbarEvents();
    }

    handleToolbarClick(event) {
        const button = event.target.closest('.toolbar-btn');
        if (!button) return;
        
        const action = button.dataset.action;
        console.log(`Toolbar action: ${action}`);
        
        // TODO: Handle different toolbar actions
    }

    handleFormulaKeydown(event) {
        if (event.key !== 'Enter' || !gridState.activeCell) return;
        const input = event.target.value;
      
        const { row, col } = gridState.activeCell;
        if (FormulaEngine.isFormula(input)) {
          CellManager.setCellFormula(row, col, input);
        } else {
          CellManager.setCellValue(row, col, input);
        }
    }

    setupToolbarEvents() {
        const toolbar = document.querySelector('.toolbar');
        if (toolbar) {
            toolbar.addEventListener('click', this.handleToolbarClick.bind(this));
        }
    }
}


// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SheetsApp();
});