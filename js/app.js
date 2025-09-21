


class SheetsApp {
    constructor() {

        this.initializeApp();

    }

    initializeApp() {
        console.log('Starting Excel Clone Pro...');
        this.initializeGrid();
        this.setupEventListeners();
        console.log('App initialized successfully!');
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
        if (event.key === 'Enter') {
            const formula = event.target.value;
            if (formula && gridState.activeCell) {
                console.log(`Formula entered: ${formula}`);
                // TODO: Handle formula evaluation
            }
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