# Architecture Notes

## Overview

This is a client-side web app for viewing Ingress inventory data. I split it into modules to keep things organized as the codebase grew from a single HTML file to something more maintainable.

## Why modules?

Started as one big HTML file with everything inline. After adding features like search, sorting, distance calculations, and container extraction, it became clear that organization was needed. Breaking it into logical pieces made it much easier to work with.

## Design decisions

**Client-side only:** Everything runs in the browser. No servers, no data uploads, no tracking. Your inventory data stays on your device.

**Vanilla JavaScript:** No frameworks. Keeps things simple and avoids the overhead of learning/maintaining framework-specific patterns.

**Progressive enhancement:** Core functionality works even if geolocation or other optional features aren't available.

## File organization

```
js/
├── constants.js  # Item types, rarity mappings, asset paths
├── utils.js      # Helper functions (distance calc, JSON cleaning, etc)
├── data.js       # Processing inventory data, extracting from containers
├── ui.js         # Creating and updating the interface
└── app.js        # Main application, event handling, state
```

**constants.js** - All the magic values in one place. Item type mappings, sort orders, image paths, etc. Started putting these in variables when I realized I was copying the same arrays around.

**utils.js** - Pure functions that don't depend on anything else. Distance calculations, timestamp formatting, JSON cleaning. Easier to reason about when they're isolated.

**data.js** - The tricky part. IITC exports have a nested structure where items can be stored inside containers, which can be inside other containers. This module handles flattening that structure and grouping items for display.

**ui.js** - DOM manipulation and rendering. Takes processed data and creates the interface. Handles things like creating item cards, updating counts, managing the upload/inventory state transitions.

**app.js** - Ties everything together. Handles file uploads, coordinates between modules, manages application state. Event handling and user interactions.

## Data flow

1. **File upload:** User drops JSON file, app reads it with FileReader
2. **Cleaning:** Remove invalid control characters that break JSON.parse()
3. **Container extraction:** Walk through the data and extract items from capsules
4. **Grouping:** Organize items by type and title for display
5. **Rendering:** Create DOM elements for each item group
6. **Filtering/sorting:** User interactions trigger re-processing of the data

## State management

Keeps application state in a single object in app.js:

```javascript
appState = {
  rawData: null,           // Original file data
  processedData: null,     // After container extraction
  fileInfo: null,          // File name and timestamp
  userLocation: null,      // For distance calculations
  keySearchQuery: '',      // Current search
  sortConfig: { ... }      // Sort modes and directions
}
```

When the user interacts with the interface (search, sort, filter), the relevant state gets updated and the UI re-renders. Nothing too fancy - just centralized state so different parts of the app can coordinate.

## Events

Uses custom events for loose coupling between UI components and the main app:

- `keySearch` - When user types in the search box
- `sortChange` - When user clicks sort buttons

This way the UI components don't need to know about the app's internal state management.

## Performance notes

**Search debouncing:** Prevents lag when typing by waiting until the user stops typing before filtering results.

**Efficient sorting:** Different item types have optimized sort algorithms instead of generic comparison.

**Full re-render:** Simpler than trying to do incremental DOM updates. Just rebuild the whole thing when data changes - it's fast enough for the amount of data we're dealing with.

**Memory management:** Clean up event listeners when clearing data. No major memory concerns with the data sizes we typically see.

## Security and privacy

**No data transmission:** Everything happens in the browser. Your inventory data never leaves your device.

**No dependencies:** No external JavaScript libraries that could introduce security issues.

**Input validation:** The JSON cleaning handles potentially malicious characters in the export files.

**No tracking:** No analytics, no cookies, no persistent storage.

## Error handling

**Graceful degradation:** If geolocation doesn't work, distance sorting just doesn't show up. If image assets are missing, show placeholders.

**File parsing:** Try to handle malformed JSON exports gracefully. Show useful error messages instead of cryptic JavaScript errors.

**Feature isolation:** Problems in one part (like image loading) don't break other parts.

## Browser support

Targets modern browsers with ES6+ support. Uses FileReader API for file handling and Geolocation API for distance calculations (optional).

No polyfills or transpilation - keeps things simple at the cost of not supporting older browsers.

## Testing

Mostly manual testing with different inventory file formats and sizes. The modular structure makes it easier to test individual pieces in isolation.

The utils functions are pure functions so they're straightforward to test if needed.

## Future improvements

**New item types:** Adding support for new items mostly just requires updating the constants and adding image assets.

**Additional filters:** The filtering system is extensible - could add filters for level, storage location, etc.

**Export features:** Could add CSV export, bookmark generation, or other output formats.

**UI improvements:** The modular structure makes it easier to experiment with different interfaces without touching the core data processing.

## Deployment

Static files only - works on any web server. Currently hosted on GitHub Pages.

No build process required since it's vanilla JavaScript. Just need to maintain the relative file paths between modules.

## Notes

Started as a quick hack to view my own inventory data, but organizing it properly made it much more maintainable and easier to add features. The modular structure is probably overkill for something this size, but it makes the code easier to work with.