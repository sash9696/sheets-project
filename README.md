# Excel Clone Pro 📊

A functional Google Sheets clone built with vanilla JavaScript, featuring advanced cycle detection algorithms, multi-sheet support , formula and formatting etc.


## 🚀 **Live Demo**

[**Try Excel Clone Pro Online**](https://excel-clone-pro.netlify.app/)

## ✨ **Key Features**

### **🧮 Advanced Formula Engine**
- **Real-time formula evaluation** with dependency tracking
- **Cell references** (A1, B2, etc.) with automatic updates
- **Mathematical operations** (+, -, *, /, parentheses)
- **Error handling** with user-friendly messages

### **🔄 Cycle Detection Algorithm**
- **DFS-based cycle detection** prevents infinite loops
- **Visual cycle tracing** with animated cell highlighting
- **Professional error handling** for circular dependencies

### **📑 Multi-Sheet Support**
- **Independent sheet tabs** with data isolation
- **Seamless switching** between multiple sheets
- **Persistent data** across sheet changes
- **Professional tab interface** matching Excel standards

### **🎨 Advanced Formatting**
- **Text formatting**: Bold, italic, underline
- **Font customization**: Family, size, color
- **Cell styling**: Background colors, text alignment
- **Two-way data binding** between UI and data model

### **📁 Professional File Operations**
- **JSON export/import** with complete workbook persistence
- **CSV export** for Excel compatibility
- **Timestamped filenames** for organization
- **Version control** and metadata tracking

### **📋 Copy/Paste System**
- **Cell data transfer** with formatting preservation
- **Formula copying** with automatic reference updates
- **Formatting preservation** across paste operations
- **Professional clipboard management**

## 🏗️ **Architecture**

### **Core Components**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Presentation  │    │   Business      │    │      Data       │
│     Layer       │    │     Logic       │    │     Layer       │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • HTML/CSS      │    │ • Formula Engine│    │ • Cell Data     │
│ • Grid System   │    │ • Cycle Detect  │    │ • Sheet State   │
│ • Toolbar UI    │    │ • Formatting    │    │ • Dependencies  │
│ • Event Handlers│    │ • Multi-Sheet   │    │ • Graph Matrix  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Data Flow**
```
User Input → Event Handler → Business Logic → Data Layer → UI Update
     ↓              ↓              ↓              ↓           ↓
  Cell Click → Grid Manager → Cell Manager → Data State → Cell Display
     ↓              ↓              ↓              ↓           ↓
Formula Input → Formula Engine → Cycle Check → Sheet Data → Cell Display
```

## 🛠️ **Installation & Setup**

### **Prerequisites**
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **No additional dependencies** - pure vanilla JavaScript
- **Local web server** (optional, for development)

### **Quick Start**
```bash
# Clone the repository
cd excel-clone-pro

# Open in browser
open index.html

## 📁 **Project Structure**

```
excel-clone-pro/
├── index.html                 # Main HTML structure
├── styles/
│   └── main.css              # Application styling
├── js/
│   ├── core/
│   │   ├── grid.js          # Grid system and cell management
│   │   ├── cell.js          # Cell data and state management
│   │   └── formula.js       # Formula parsing and evaluation
│   ├── algorithms/
│   │   └── cycle-detection.js # DFS cycle detection algorithm
│   ├── features/
│   │   ├── formatting.js    # Text and cell formatting
│   │   ├── copy-paste.js   # Copy/paste functionality
│   │   ├── file-operations.js # Save/load operations
│   │   └── multi-sheet.js   # Multi-sheet management
│   └── app.js               # Main application logic
├── README.md                # This file
├── implementation-guide.md  # Step-by-step build guide
└── interview-prep.md        # Interview preparation guide
```

## 🎯 **Usage Guide**

### **Basic Operations**
1. **Click any cell** to select it
2. **Type text or numbers** directly into cells
3. **Use formula bar** for formulas (start with `=`)
4. **Press Enter** to move to next row
5. **Use toolbar** for formatting options

### **Formula Examples**
```javascript
// Basic math
=1+2*3          // Result: 7
=(10-5)/2       // Result: 2.5

// Cell references
=A1+B1          // Sum of A1 and B1
=A1*2           // Double the value in A1

// Complex formulas
=(A1+B1)*C1     // Sum A1+B1, then multiply by C1
```

### **Advanced Features**
- **Multi-sheet**: Click "+" to create new sheets
- **Copy/Paste**: Select cell, click Copy, paste elsewhere
- **Formatting**: Use toolbar for bold, italic, colors
- **Save/Load**: Use Save/Open buttons for file operations

## 🔧 **Technical Implementation**

### **Key Algorithms**
- **Depth-First Search (DFS)** for cycle detection
- **Dependency tracking** for formula updates
- **Graph traversal** for circular dependency detection
- **State management** for multi-sheet data

### **Data Structures**
```javascript
// Cell Data Structure
{
  value: "Hello",
  formula: "=A1+1",
  formatting: {
    bold: true,
    italic: false,
    fontSize: 14,
    fontColor: "#000000",
    backgroundColor: "#ffffff"
  },
  dependencies: ["A1"],
  dependents: ["B1"]
}

// Sheet State
{
  currentSheet: 0,
  sheets: [sheetData1, sheetData2, ...],
  dependencyGraph: []
}
```

### **Performance Optimizations**
- **Efficient dependency tracking** with O(1) lookups
- **Lazy evaluation** - only recalculate when needed
- **Memory management** for large datasets
- **Event delegation** for dynamic content

## 🧪 **Testing**

### **Manual Testing**
1. **Grid functionality**: Click cells, type content
2. **Formula engine**: Try various formulas
3. **Cycle detection**: Create circular dependencies
4. **Multi-sheet**: Create and switch between sheets
5. **File operations**: Save and load workbooks


## 🎓 **Learning Outcomes**

### **Technical Skills Demonstrated**
- **Advanced Algorithms**: DFS, cycle detection, graph traversal
- **State Management**: Complex multi-sheet state handling
- **UI/UX Design**: Professional spreadsheet interface
- **Performance**: Efficient data structures and algorithms

### **Problem-Solving Approach**
- **Incremental development** - built feature by feature
- **User-centered design** - focused on Excel-like experience
- **Technical depth** - implemented advanced algorithms
- **Code quality** - maintainable, modular architecture



**Built with ❤️ using vanilla JavaScript**

*Excel Clone Pro - Professional spreadsheet functionality in your browser*
