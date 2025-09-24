# Ingress Inventory Viewer - Architecture Documentation

## Overview

The Ingress Inventory Viewer is a client-side web application built with modern JavaScript architecture principles. The application processes inventory exports from the Ingress IITC "My Keys" plugin and provides an interactive interface for viewing, searching, and analyzing game items.

## Architecture Principles

### 1. **Modular Design**
- **Separation of Concerns**: Each module has a single, well-defined responsibility
- **Loose Coupling**: Modules interact through well-defined interfaces
- **High Cohesion**: Related functionality is grouped together

### 2. **Client-Side Processing**
- **No Server Dependencies**: Runs entirely in the browser
- **Privacy First**: No data transmission to external servers
- **Offline Capable**: Works without internet after initial load

### 3. **Progressive Enhancement**
- **Graceful Degradation**: Core functionality works even if advanced features fail
- **Feature Detection**: Safe handling of browser API availability

## Module Structure

```
ingress-inventory/
├── index.html              # Application shell and entry point
├── css/
│   └── styles.css         # Centralized styling with CSS custom properties
├── js/
│   ├── constants.js       # Configuration constants and mappings
│   ├── utils.js           # Pure utility functions
│   ├── data.js            # Data processing and transformation
│   ├── ui.js              # DOM manipulation and rendering
│   └── app.js             # Application coordination and state management
└── assets/
    └── images/            # Game asset images and placeholders
```

## Module Responsibilities

### `constants.js` - Configuration Layer
**Purpose**: Centralized configuration and constants to eliminate magic values

**Key Features**:
- Item type classifications and mappings
- Rarity system definitions
- Asset path templates
- UI configuration values
- Sort ordering specifications

**Exports**: `CONSTANTS` global object with categorized configuration

### `utils.js` - Utility Layer
**Purpose**: Pure functions for data transformation and calculations

**Key Functions**:
- `cleanJsonString()` - Sanitizes invalid control characters from JSON
- `formatLocalTs()` - Timestamp formatting with locale support
- `decodePortalLocation()` - Hex coordinate conversion to lat/lng
- `haversineKm()` - Geographic distance calculations
- `getDisplayType()` - Resource type to display category mapping
- `displayTitle()` - Item title generation logic

**Design**: All functions are pure (no side effects) and testable in isolation

### `data.js` - Data Processing Layer
**Purpose**: Handles complex data transformation and business logic

**Key Functions**:
- `extractNestedItems()` - Recursively unpacks container items
- `processInventoryData()` - Main data processing pipeline
- `filterItems()` - Applies user-selected filters
- `groupItems()` - Groups items by type and title for rendering
- `sortTypeGroups()` - Type-specific sorting algorithms

**Architecture**: Pipeline design with clear input/output contracts

### `ui.js` - Presentation Layer
**Purpose**: DOM manipulation, rendering, and user interface management

**Key Functions**:
- `renderInventory()` - Main rendering orchestrator
- `createItemCard()` - Individual card generation
- `showUploadInterface()` / `showInventoryInterface()` - State transitions
- `populateRarityFilter()` - Dynamic filter population
- `findImage()` - Asset resolution logic

**Design**: Declarative rendering approach with reusable UI components

### `app.js` - Application Layer
**Purpose**: Application initialization, state management, and module coordination

**Key Responsibilities**:
- Application lifecycle management
- Event handling and delegation
- State management and persistence
- Module coordination
- Error handling and user feedback

**Architecture**: Central coordinator with minimal business logic

## Data Flow Architecture

### 1. **File Upload Pipeline**
```
User Upload → File Reading → JSON Cleaning → Parsing → Validation → Processing
```

### 2. **Data Processing Pipeline**
```
Raw JSON → Container Extraction → Item Expansion → Filter Population → Initial Render
```

### 3. **User Interaction Flow**
```
User Input → State Update → Data Filtering → Grouping → Sorting → Re-render
```

### 4. **Rendering Pipeline**
```
Grouped Data → Type Sections → Sort Applications → Card Generation → DOM Updates
```

## State Management

### **Application State Structure**
```javascript
appState = {
  // Data
  rawData: null,           // Original JSON from file
  processedData: null,     // Processed inventory data
  fileInfo: null,          // File metadata string
  userLocation: null,      // User's geographic position

  // UI State
  keySearchQuery: '',      // Current search filter
  keySearchShouldRefocus: false,
  keySearchSelection: null,

  // Sort Configuration
  sortConfig: {
    mode: 'alpha',         // Current sort mode for keys
    directions: {          // Sort direction for each mode
      alpha: 'asc',
      count: 'asc',
      time: 'asc',
      distance: 'asc'
    }
  }
}
```

### **State Management Principles**
- **Immutable Updates**: State changes create new objects rather than mutating existing ones
- **Single Source of Truth**: All state centralized in the application module
- **Reactive Updates**: UI automatically updates when state changes
- **Event-Driven**: State changes triggered by user interactions through events

## Event System

### **Custom Events**
- `keySearch` - Fired when user types in key search box
- `sortChange` - Fired when user changes sort mode/direction

### **Event Flow**
```
UI Interaction → Event Dispatch → State Update → Re-render → DOM Update
```

## Performance Considerations

### **Optimization Strategies**
1. **Debounced Search** - Prevents excessive re-rendering during typing
2. **Efficient Sorting** - Optimized sort algorithms per item type
3. **Minimal DOM Updates** - Full re-render approach for simplicity and correctness
4. **Cached Elements** - DOM element references cached for performance
5. **Event Delegation** - Efficient event handling for dynamic content

### **Memory Management**
- Event listeners properly cleaned up
- Large data structures released when clearing inventory
- No memory leaks in re-render cycles

## Security Considerations

### **Client-Side Security**
- **XSS Prevention** - All user content properly escaped
- **JSON Validation** - Robust parsing with error handling
- **Input Sanitization** - Control character removal from user files
- **No External Dependencies** - Eliminates supply chain security risks

### **Privacy Protection**
- **No Data Transmission** - All processing happens locally
- **No Persistent Storage** - Data cleared on page refresh
- **No Analytics** - No user behavior tracking

## Error Handling Strategy

### **Graceful Degradation**
- Non-critical features fail silently (e.g., geolocation)
- Clear error messages for user-facing failures
- Application remains functional even when some features fail

### **Error Boundaries**
- File parsing errors don't crash the application
- Individual feature failures don't affect other features
- Comprehensive logging for debugging

## Browser Compatibility

### **Target Support**
- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Required APIs**: FileReader, Geolocation (optional), ES6+ features
- **Graceful Fallbacks**: Geolocation failure doesn't break distance sorting

### **Progressive Enhancement**
- Core functionality works without advanced features
- Enhanced experience with modern browser capabilities

## Testing Strategy

### **Testability Features**
- **Pure Functions** - Utils module functions easily unit tested
- **Modular Design** - Individual modules can be tested in isolation
- **Predictable State** - Application state changes are deterministic
- **Error Scenarios** - Comprehensive error handling enables negative testing

### **Testing Approach**
- Manual testing with various inventory file formats
- Cross-browser compatibility testing
- Performance testing with large inventory files
- Error condition testing (malformed files, missing assets)

## Future Extensibility

### **Extension Points**
1. **New Item Types** - Easy addition via constants.js configuration
2. **Additional Filters** - Extensible filter system in data.js
3. **New Sort Modes** - Pluggable sort algorithms
4. **UI Themes** - CSS custom properties enable easy theming
5. **Export Features** - Modular architecture supports new output formats

### **Architectural Flexibility**
- Module boundaries designed for future enhancement
- Configuration-driven behavior reduces code changes
- Event system allows new features without core changes
- Clear separation enables feature addition without refactoring

## Deployment Architecture

### **Static Hosting Requirements**
- **Server**: Any static file server (GitHub Pages, Netlify, etc.)
- **HTTPS**: Required for secure asset loading
- **File Structure**: Preserve relative paths between modules

### **Build Process**
- **No Build Required** - Vanilla JavaScript, no compilation needed
- **Asset Management** - Images organized in assets/ directory
- **Version Control** - All source files tracked in git

## Conclusion

The Ingress Inventory Viewer demonstrates professional web development practices through:

- **Clean Architecture** - Well-defined module boundaries and responsibilities
- **Modern JavaScript** - ES6+ features with browser compatibility considerations
- **User-Centric Design** - Privacy-first approach with excellent user experience
- **Maintainable Code** - Clear structure enabling easy updates and enhancements
- **Professional Quality** - Production-ready error handling and performance optimization

This architecture serves both as a functional tool for Ingress players and a demonstration of advanced frontend development skills for potential employers.