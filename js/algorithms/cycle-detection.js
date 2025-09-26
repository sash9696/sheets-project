// Simple cycle detection
function hasCycle(startAddress, visited = new Set(), path = new Set()) {
    // If we're back to a cell we're already checking in this path
    if (path.has(startAddress)) {
        return true; // CYCLE FOUND!
    }
    
    // If we've already checked this cell
    if (visited.has(startAddress)) {
        return false; // No cycle from this path
    }
    
    // Mark this cell as being checked
    path.add(startAddress);
    visited.add(startAddress);
    
    // Get what this cell depends on
    const [row, col] = parseCellAddress(startAddress);
    const cellData = CellManager.getCellData(row, col);
    
    if (cellData.formula) {
        const dependencies = extractDependencies(cellData.formula);
        
        // Check each dependency for cycles
        for (const dep of dependencies) {
            if (hasCycle(dep, visited, path)) {
                return true; // Cycle found in dependency
            }
        }
    }
    
    // Remove from current path (we're done checking this cell)
    path.delete(startAddress);
    return false;
}

// Check if a formula would create a cycle
function wouldCreateCycle(formula, targetAddress) {
    // Temporarily add the formula to check
    const [row, col] = parseCellAddress(targetAddress);
    const cellData = CellManager.getCellData(row, col);
    const oldFormula = cellData.formula;
    
    // Set the new formula temporarily
    cellData.formula = formula;
    
    // Check for cycle
    const hasCycleResult = hasCycle(targetAddress);
    
    // Restore old formula
    cellData.formula = oldFormula;
    
    return hasCycleResult;
}

// Visual cycle tracing with animations
function colorPromise() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), 1000);
    });
}

async function traceCyclePath(cycleStart) {
    console.log(`Tracing cycle starting from: ${cycleStart}`);
    
    // Highlight the cycle path
    const cyclePath = findCyclePath(cycleStart);
    
    for (const address of cyclePath) {
        const cell = gridState.cells.get(address);
        if (cell) {
            cell.style.backgroundColor = 'lightblue';
            await colorPromise();
        }
    }
    
    // Reset colors after tracing
    setTimeout(() => {
        for (const address of cyclePath) {
            const cell = gridState.cells.get(address);
            if (cell) {
                cell.style.backgroundColor = '';
            }
        }
    }, 2000);
}

function findCyclePath(startAddress) {
    const path = [startAddress];
    const graph = buildDependencyGraph();
    const visited = new Set();
    
    function dfs(current) {
        if (visited.has(current)) {
            return path.slice(path.indexOf(current));
        }
        
        visited.add(current);
        const neighbors = graph.get(current) || [];
        
        for (const neighbor of neighbors) {
            path.push(neighbor);
            const cycle = dfs(neighbor);
            if (cycle.length > 0) return cycle;
            path.pop();
        }
        
        return [];
    }
    
    return dfs(startAddress);
}

function buildDependencyGraph(sheetIndex = dataState.currentSheet) {
    const graph = new Map();
    
    for (let row = 0; row < 100; row++) {
        for (let col = 0; col < 26; col++) {
            const cellData = CellManager.getCellData(row, col, sheetIndex);
            if (cellData.formula) {
                const dependencies = extractDependencies(cellData.formula);
                const cellAddress = getCellAddress(row, col);
                graph.set(cellAddress, dependencies);
            }
        }
    }
    
    return graph;
}

// Export functions
window.CycleDetection = {
    hasCycle,
    wouldCreateCycle,
    traceCyclePath,
    colorPromise
};