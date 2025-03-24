# Tab Manager Chrome Extension

A Chrome extension that demonstrates proper error handling when working with tabs, preventing common "Tab not found" errors.

## Features

- Safely check if a tab exists before performing operations
- Proper promise-based error handling for tab operations
- List all open tabs with their IDs, titles, and URLs
- Perform actions on specific tabs with proper error handling
- User-friendly interface for tab management

## How to Install

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked" and select the `extension` folder from this project
5. The extension should now appear in your browser toolbar

## How to Use

1. Click the extension icon in your browser toolbar to open the popup
2. View the list of all open tabs with their IDs
3. Click on a tab in the list to fill in its ID automatically
4. Click "Perform Action on Tab" to test an action on the selected tab
5. If the tab doesn't exist or there's an error, you'll see a clear error message

## Technical Implementation

This extension demonstrates:

- Proper error checking before tab operations
- Handling Promise-based Chrome APIs
- Clean error reporting
- Avoiding console errors from missing tabs
- Separating concerns with background, content, and popup scripts

## Files

- `manifest.json` - Extension configuration
- `background.js` - Background service worker with tab handling logic
- `content.js` - Content script that runs in each tab
- `popup.html` - User interface
- `popup.js` - UI interaction logic

## Fixing "Tab Not Found" Errors

The key part of this implementation is the `performActionOnTab` function in `background.js`, which:

1. Checks if a tab exists before attempting operations on it
2. Handles errors gracefully
3. Provides clear error messages
4. Uses Promise-based APIs properly 