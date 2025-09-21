


class SheetsApp {
    constructor() {

        this.initializeApp();

    }

    initializeApp() {
        console.log('Starting Excel Clone Pro...');
        this.initializeGrid();
        console.log('App initialized successfully!');
    }

    initializeGrid(){
        if (window.GridManager) {
            GridManager.initializeGrid();
        } else {
            console.error('GridManager not found!');
        }
    }
}


// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SheetsApp();
});