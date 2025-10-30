# VoIP Notification Comparison App

A demonstration Electron 37 app that compares native macOS notifications with custom HTML-based notification windows.

## Overview

This app showcases two different approaches to implementing VoIP call notifications in Electron:

1. **Native Notification** - Uses macOS Notification Center via Electron's `Notification` API
2. **Custom HTML Notification** - A custom HTML window styled to mimic a notification

## Features

- Main window with two buttons to trigger each notification type
- Native macOS notification with call information
- Custom HTML notification window with:
  - Smooth animations
  - Accept and Decline buttons
  - Professional styling matching macOS aesthetics
  - Auto-positioning at top-right corner
  - Always-on-top floating window behavior

## Project Structure

```
├── main.js                        # Electron main process
├── preload.js                     # Secure IPC bridge
├── preload-notification.js        # Preload for notification window
├── index.html                     # Main window UI
├── call-notification.html         # Custom notification window
├── styles.css                     # Styling for main window
├── package.json                   # Project configuration
├── README.md                      # This file
└── TRANSPARENT_WINDOW_GUIDE.md    # Troubleshooting guide for transparent windows
```

## Installation

```bash
npm install
```

## Running the App

Start the development app:
```bash
npm start
```

Or with logging enabled:
```bash
npm run dev
```

## How to Use

1. Launch the app with `npm start`
2. Click **"Show Native Notification"** to see a macOS native notification
3. Click **"Show Custom Notification"** to see the HTML-based custom notification window
4. In the custom notification, click Accept or Decline to close it

## Key Implementation Details

### Native Notification
- Uses Electron's `Notification` class
- Integrates with macOS Notification Center
- Limited customization for buttons on macOS
- Automatic system integration

### Custom Notification Window
- Frameless (`frame: false`)
- Transparent background
- Always-on-top floating window
- Positioned at top-right of primary display
- IPC-based communication for button actions
- Smooth animations and hover effects

## Security

- **Context Isolation**: Enabled to separate main and renderer processes
- **No Node Integration**: Disabled in renderer process
- **Secure IPC Bridge**: Uses `contextBridge` to safely expose only needed APIs
- **Preload Script**: Validates all cross-process communication

## Technologies Used

- **Electron 37** - Cross-platform desktop application framework
- **Node.js** - JavaScript runtime
- **HTML/CSS/JavaScript** - User interface and styling
- **IPC** - Inter-process communication

## Notes

- The app is designed primarily for macOS
- The custom notification is more suitable for VoIP applications requiring reliable button interactions
- Native notifications are better for informational purposes
- Both approaches can be used together depending on notification priority

## Comparison Summary

| Feature | Native | Custom HTML |
|---------|--------|------------|
| Integration | macOS Notification Center | Standalone window |
| Button Support | Limited on macOS | Full support |
| Customization | Limited | Full control |
| Resource Usage | Minimal | Moderate |
| Positioning | System default | Custom (top-right) |
| Always visible | Depends on settings | Yes |

## Troubleshooting

### Black Borders on Transparent Window

If you see black borders around the custom notification window, see **[TRANSPARENT_WINDOW_GUIDE.md](./TRANSPARENT_WINDOW_GUIDE.md)** for detailed solutions.

**Quick fix:**
- Use `'ready-to-show'` event instead of `loadFile().then()`
- Use absolute positioning to fill the window
- Ensure `show: false` is set initially

### Other Issues

See the troubleshooting section in [TRANSPARENT_WINDOW_GUIDE.md](./TRANSPARENT_WINDOW_GUIDE.md) for:
- Content not filling window
- Rounded corners being clipped
- Window appearing behind other windows
- Styling conflicts

## Resources

- **Transparent Window Implementation**: See [TRANSPARENT_WINDOW_GUIDE.md](./TRANSPARENT_WINDOW_GUIDE.md)
- **Reference Project**: `/Users/jean/Github/whats-next-meet-electron` (working floating menu implementation)
- **Electron Docs**: https://www.electronjs.org/docs/api/browser-window

## Author

Jean

## License

ISC
