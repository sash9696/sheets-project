


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
        
        // Toolbar inputs
        const fontSizeSel = document.querySelector('.font-size');
        const fontFamilySel = document.querySelector('.font-family');
        const fontColorInp = document.querySelector('.font-color');
        const bgColorInp = document.querySelector('.background-color');

        if (fontSizeSel) fontSizeSel.addEventListener('change', () => {
            if (!gridState.activeCell) return;
            const { row, col } = gridState.activeCell;
            FormattingManager.applyFontSize(row, col, parseInt(fontSizeSel.value, 10));
        });

        if (fontFamilySel) fontFamilySel.addEventListener('change', () => {
            if (!gridState.activeCell) return;
            const { row, col } = gridState.activeCell;
            FormattingManager.applyFontFamily(row, col, fontFamilySel.value);
        });

        if (fontColorInp) fontColorInp.addEventListener('change', () => {
            if (!gridState.activeCell) return;
            const { row, col } = gridState.activeCell;
            FormattingManager.applyFontColor(row, col, fontColorInp.value);
        });

        if (bgColorInp) bgColorInp.addEventListener('change', () => {
            if (!gridState.activeCell) return;
            const { row, col } = gridState.activeCell;
            FormattingManager.applyBackgroundColor(row, col, bgColorInp.value);
        });
        
        this.setupToolbarEvents();
        this.setupSheetEvents();
    }

    handleToolbarClick(event) {
        const button = event.target.closest('.toolbar-btn');
        if (!button) return;
        
        const action = button.dataset.action;
        console.log(`Toolbar action: ${action}`);
        
        // TODO: Handle different toolbar actions

        const { row, col } = gridState.activeCell;

        switch (action) {
            case 'bold':
                const isBold = button.classList.contains('active');
                FormattingManager.applyBold(row, col, !isBold);
                button.classList.toggle('active');
                break;
                
            case 'italic':
                const isItalic = button.classList.contains('active');
                FormattingManager.applyItalic(row, col, !isItalic);
                button.classList.toggle('active');
                break;
                
            case 'underline':
                // TODO: Implement underline
                break;

            case 'align-left':
                FormattingManager.applyTextAlign(row, col, 'left');
                break;
            case 'align-center':
                FormattingManager.applyTextAlign(row, col, 'center');
                break;
            case 'align-right':
                FormattingManager.applyTextAlign(row, col, 'right');
                break;
                
            case 'copy':
                CopyPasteManager.copySelection();
                break;
                
            case 'cut':
                CopyPasteManager.copySelection();
                // Clear the cell after copying
                CellManager.setCellValue(row, col, '');
                break;
                
            case 'paste':
                CopyPasteManager.pasteSelection();
                break;
                
            case 'save':
                FileManager.saveWorkbook();
                break;
                
            case 'open':
                // Create file input for loading
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    if (e.target.files[0]) {
                        FileManager.loadWorkbook(e.target.files[0]);
                    }
                };
                input.click();
                break;
                
            case 'download-csv':
                FileManager.downloadAsCSV();
                break;
        }
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
    
    setupSheetEvents() {
        // Add sheet button
        const addSheetBtn = document.querySelector('.add-sheet-btn');
        if (addSheetBtn) {
            addSheetBtn.addEventListener('click', () => {
                MultiSheetManager.createNewSheet();
            });
        }
        
        // Sheet tab clicks
        const sheetTabs = document.querySelectorAll('.sheet-tab');
        sheetTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const sheetIndex = parseInt(tab.dataset.sheet);
                MultiSheetManager.switchToSheet(sheetIndex);
            });
        });
    }
}


// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SheetsApp();
});