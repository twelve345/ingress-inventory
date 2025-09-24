# 🎯 Ingress Inventory Viewer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=for-the-badge)](https://twelve345.github.io/ingress-inventory)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> A sophisticated web application for Ingress players to visualize, organize, and analyze their game inventory with advanced filtering, sorting, and geolocation features.

**🌐 [Try it now →](https://twelve345.github.io/ingress-inventory)**

![Ingress Inventory Viewer Screenshot](https://raw.githubusercontent.com/twelve345/ingress-inventory/main/assets/images/ingress-inventory-screenshot.png)

---

## 🎮 What is this?

**Ingress Inventory Viewer** is a powerful client-side web application designed for players of Niantic's augmented reality game *Ingress*. It transforms exported inventory JSON data into a rich, interactive dashboard with advanced analytics and organizational tools.

### 🌟 Perfect for Portfolio Demonstrations

This project showcases:
- **Frontend Development Excellence** - Modular JavaScript architecture, responsive CSS, user-centric design
- **Software Architecture** - Clean separation of concerns, maintainable code structure, professional patterns
- **Data Processing & Visualization** - Complex JSON parsing, nested data structures, real-time filtering
- **User Experience Design** - Intuitive interfaces, drag-and-drop functionality, state management
- **Problem-Solving Skills** - Data sanitization, performance optimization, cross-browser compatibility

---

## ⚡ Key Features

### 🎯 **Smart Data Processing**
- **Automatic JSON Sanitization** - Removes invalid control characters that break standard parsers
- **Nested Container Extraction** - Intelligently unpacks items from capsules and containers
- **Data Validation** - Robust error handling with clear user feedback

### 🎨 **Advanced UI/UX**
- **Drag & Drop Interface** - Intuitive file upload with visual feedback overlays
- **Dual-State Design** - Clean upload interface transitions to full inventory dashboard
- **Responsive Layout** - Optimized for desktop and mobile viewing
- **Real-time File Info** - Persistent display of loaded file metadata

### 📊 **Powerful Analytics**
- **Dynamic Grouping** - Intelligent item categorization and counting
- **Multi-Modal Sorting** - Alphabetical, quantity, timestamp, and distance-based ordering
- **Advanced Filtering** - By rarity, type, and storage location
- **Geolocation Integration** - Distance calculations to portal keys

### 🗺️ **Geospatial Features**
- **Portal Distance Calculation** - Real-world distances using Haversine formula
- **Location-based Sorting** - Find nearest/farthest portal keys
- **Coordinate Decoding** - Converts hex-encoded locations to lat/lng

### 🔒 **Privacy-First Architecture**
- **100% Client-Side Processing** - No data leaves user's device
- **Zero Server Requirements** - Runs entirely in browser
- **No Data Collection** - Complete user privacy protection

---

## 🛠️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Architecture** | Modular design, Separation of concerns, Event-driven patterns |
| **Styling** | CSS Grid, Flexbox, Custom Properties, Responsive Design |
| **APIs** | File API, Geolocation API, Drag & Drop API |
| **Data Processing** | JSON parsing, Regular expressions, Array methods |
| **State Management** | Centralized application state, Reactive updates |
| **Deployment** | GitHub Pages (Static hosting) |

---

## 🚀 Live Demo

**Experience it yourself:** [https://twelve345.github.io/ingress-inventory](https://twelve345.github.io/ingress-inventory)

### How to Use:
1. **Export your inventory** from the Ingress IITC "My Keys" plugin
2. **Visit the app** and drag/drop your `inventory.json` file
3. **Explore your inventory** with powerful filtering and sorting tools

---

## 💻 Local Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for CORS compliance)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/twelve345/ingress-inventory.git
cd ingress-inventory

# Start local server (Python 3)
python3 -m http.server 8000

# Or using Node.js
npx serve .

# Visit http://localhost:8000
```

### Project Structure
```
ingress-inventory/
├── index.html              # Application shell and entry point
├── css/
│   └── styles.css         # Centralized styling with design system
├── js/
│   ├── constants.js       # Configuration constants and mappings
│   ├── utils.js           # Pure utility functions
│   ├── data.js            # Data processing and transformation
│   ├── ui.js              # DOM manipulation and rendering
│   └── app.js             # Application coordination and state management
├── assets/
│   └── images/            # Game assets and placeholders
├── ARCHITECTURE.md        # Technical architecture documentation
├── README.md              # This file
└── LICENSE                # MIT License
```

---

## 🏗️ Technical Architecture

### Modular Architecture
The application follows modern JavaScript architecture principles with **clean separation of concerns**:

- **`constants.js`** - Configuration layer with centralized constants and mappings
- **`utils.js`** - Pure utility functions for data transformation and calculations
- **`data.js`** - Business logic for data processing, filtering, and grouping
- **`ui.js`** - Presentation layer handling DOM manipulation and rendering
- **`app.js`** - Application layer coordinating modules and managing state

### Data Flow Pipeline
1. **File Upload** → Client-side file reading via FileReader API
2. **Data Sanitization** → Remove invalid control characters
3. **JSON Parsing** → Parse and validate data structure
4. **Container Extraction** → Recursively extract nested items
5. **State Management** → Update centralized application state
6. **Rendering** → Event-driven UI updates with filtering/sorting

### Key Design Patterns
- **Module Pattern** - Clean encapsulation with defined interfaces
- **Event-Driven Architecture** - Loose coupling between UI and business logic
- **Pipeline Processing** - Composable data transformation stages
- **State Management** - Centralized state with reactive updates
- **Error Boundaries** - Graceful degradation with comprehensive error handling

### Performance Optimizations
- **Debounced Search** - Prevents excessive re-rendering during user input
- **Efficient Sorting** - Optimized algorithms per item type
- **Event Delegation** - Efficient DOM event handling
- **Memory Management** - Proper cleanup of large datasets
- **CSS Hardware Acceleration** - Smooth animations and transitions

---

## 🛡️ Privacy & Security

### Client-Side Processing
- **No Server Communication** - Files processed entirely in browser
- **No Data Storage** - Information exists only in session memory
- **No Analytics Tracking** - Zero user behavior monitoring
- **Local-Only Operation** - Works offline after initial page load

### Data Handling
- **Temporary Storage** - Data cleared on page refresh/close
- **No File Caching** - No persistent local storage
- **Secure Origins** - Served over HTTPS via GitHub Pages

---

## 🎯 Problem Solved

### The Challenge
Ingress players accumulate hundreds of inventory items but lack tools to:
- **Organize large inventories** efficiently
- **Find specific items** among thousands
- **Analyze inventory composition** and distribution
- **Plan strategic item usage** based on location

### The Solution
A sophisticated web application that transforms raw game data into actionable intelligence through:
- **Advanced filtering and search** capabilities
- **Geospatial analysis** for location-based decisions
- **Visual organization** with grouping and sorting
- **Privacy-respecting architecture** for sensitive game data

---

## 🏆 Technical Challenges Overcome

### 1. **Data Sanitization**
- **Challenge**: IITC exports contain invalid control characters breaking JSON parsers
- **Solution**: Custom sanitization algorithm preserving data integrity while removing problematic characters

### 2. **Complex Data Structures**
- **Challenge**: Nested containers with recursive item storage (capsules within capsules)
- **Solution**: Recursive extraction algorithm with proper metadata preservation

### 3. **State Management**
- **Challenge**: Complex UI state transitions between upload and inventory modes
- **Solution**: Clean state management pattern with persistent file information

### 4. **Performance at Scale**
- **Challenge**: Processing thousands of inventory items without UI blocking
- **Solution**: Efficient algorithms with minimal DOM manipulation

---

## 🤝 Contributing

Contributions are welcome! This project demonstrates:
- Clean, maintainable code architecture
- User-centered design principles
- Performance optimization techniques
- Privacy-first development approach

### Development Guidelines
- Follow existing code style and patterns
- Maintain client-side only architecture
- Preserve privacy-first design
- Add comments for complex algorithms

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎯 Portfolio Highlights

This project demonstrates proficiency in:

✅ **Software Architecture** - Modular design, separation of concerns, maintainable code structure
✅ **Frontend Development** - Modern JavaScript (ES6+), CSS Grid/Flexbox, responsive design
✅ **Data Processing** - JSON manipulation, complex algorithms, robust error handling
✅ **User Experience** - Intuitive interfaces, drag-and-drop, seamless state management
✅ **Performance Engineering** - Efficient algorithms, memory management, optimization techniques
✅ **Code Quality** - Clean code principles, comprehensive documentation, professional practices
✅ **Problem Solving** - Real-world application, user-focused solutions, technical challenges

---

**Built with ❤️ for the Ingress community | Engineered to showcase professional development practices**

*This project serves as both a practical tool for Ingress players and a demonstration of production-quality frontend architecture and advanced JavaScript development skills.*

### 📖 Technical Documentation

For detailed technical information about the application architecture, design decisions, and implementation details, see [ARCHITECTURE.md](ARCHITECTURE.md).