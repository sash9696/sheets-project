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

// Export functions
window.CycleDetection = {
    hasCycle,
    wouldCreateCycle
};