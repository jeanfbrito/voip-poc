# VoIP Notification Comparison App

A professional Electron 37 cross-platform desktop application that demonstrates multiple approaches to VoIP call notifications with advanced features like screen sharing and video call integration.

## Overview

This app showcases **5 different notification approaches** optimized for VoIP applications:

1. **Native Notification** - System-level notifications with action buttons
2. **Custom Light Notification** - HTML-based notification with light theme
3. **Dark Notification** - HTML-based notification with dark theme
4. **Compact Notification** - Minimal notification matching native OS notification size
5. **Advanced VoIP Notification** - Full-featured call control panel with:
   - Large caller avatar
   - Screen sharing toggle
   - Video/webcam control
   - Call duration timer
   - Connection quality indicator

## Features

### Core Capabilities
- ✅ **Cross-platform support** - Windows, macOS, and Linux fully tested
- ✅ **Native notifications** with action buttons on all platforms
- ✅ **5 notification types** for different use cases
- ✅ **Screen sharing** - Toggle screen share during calls
- ✅ **Video call** - Enable/disable webcam with visual feedback
- ✅ **Call management** - Accept, Answer, and End call controls
- ✅ **Live call timer** - Real-time call duration display
- ✅ **Connection quality** - Visual signal strength indicator
- ✅ **Professional design** - Corporate-ready dark theme with subtle animations

### Technical Features
- Transparent frameless windows with zero artifacts
- Auto-positioning at top-right corner
- Always-on-top floating window behavior
- IPC-based secure communication
- Platform-specific icon formats (macOS .icns, Windows .ico, Linux .png)
- Context isolation for security

## Project Structure

```
voip-poc/
├── main.js                          # Electron main process (window management, IPC)
├── preload.js                       # Secure IPC bridge (main window)
├── preload-notification.js          # Secure IPC bridge (notification windows)
├── index.html                       # Main application window UI
├── styles.css                       # Main window styling
├── call-notification.html           # Light theme custom notification
├── dark-notification.html           # Dark theme custom notification
├── compact-dark-notification.html   # Compact notification (native size)
├── advanced-notification.html       # Advanced VoIP call interface
├── avatar.png                       # Caller avatar image
├── icon.icns                        # macOS icon
├── icon.ico                         # Windows icon
├── icon.png                         # Linux icon
├── package.json                     # Project configuration
├── README.md                        # This file
└── TRANSPARENT_WINDOW_GUIDE.md      # Troubleshooting transparent windows
```

## Prerequisites

- **Node.js** 14.0 or higher
- **npm** or **yarn**
- **macOS**, **Windows**, or **Linux** (fully supported on all platforms)

## Installation from Zero

### 1. Clone the Repository
```bash
git clone https://github.com/jeanfbrito/voip-poc.git
cd voip-poc
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- `electron` - Cross-platform desktop framework
- `electron-builder` - For packaging (optional)
- Development tools and scripts

## Running the App

### Development Mode
```bash
npm start
```

This launches the app with the dev/main process. Use this for development and testing.

### Debug Mode
To open DevTools for debugging, uncomment this line in `main.js` (line 23):
```javascript
// mainWindow.webContents.openDevTools();
```

Then run:
```bash
npm start
```

## How to Use the App

### Main Window
1. Launch the app with `npm start`
2. The main window displays 5 notification buttons:
   - 📱 **Show Native Notification** - System notification with action buttons
   - 🎨 **Show Custom Notification** - Light theme HTML notification
   - 🌙 **Show Dark Notification** - Dark theme HTML notification
   - 📬 **Show Compact Notification** - Minimal notification (native size)
   - ⭐ **Show Advanced Notification** - Full VoIP call interface

### Testing Each Notification Type

#### Native Notification
1. Click "Show Native Notification"
2. A system notification appears with "Accept" and "Decline" buttons
3. Click the buttons to see console output
4. **Note:** Behavior varies by OS:
   - **macOS**: Full action button support
   - **Windows**: Full action button support
   - **Linux**: Full action button support (GNOME/KDE)

#### Custom Notifications (Light, Dark, Compact)
1. Click the desired notification button
2. A floating window appears at the top-right corner
3. Click "Accept" or "Decline" to close it
4. The window auto-closes after accepting/declining

#### Advanced VoIP Notification
1. Click "Show Advanced Notification"
2. A rich notification appears with:
   - **Caller avatar** (left side, 140×140px)
   - **Caller info** - Name and phone number
   - **Connection quality** - Signal strength indicator
   - **Call duration** - Live timer
   - **4 Action buttons:**
     - ☎ **Answer** (Green) - Accept the call
     - 🖥 **Share** (Blue) - Toggle screen sharing
     - 📹 **Video** (Purple) - Enable webcam (highlights when active)
     - ✕ **End** (Red) - Decline or end the call

## Key Implementation Details

### Native Notification
- Uses Electron's `Notification` class
- **Cross-platform action buttons** - Works on Windows, macOS, and Linux
- Platform-specific icons:
  - macOS: `.icns` format
  - Windows: `.ico` format
  - Linux: `.png` format
- Automatic system integration with native OS notification center

### Custom Notification Windows
All custom HTML notifications share these technical features:

**Window Properties:**
- Frameless (`frame: false`) - No system window decorations
- Transparent background - Blends with OS
- Always-on-top (`alwaysOnTop: true`) - Stays above other windows
- Auto-positioned at top-right corner
- Skip taskbar (`skipTaskbar: true`)
- Floating window level

**Critical Implementation Pattern:**
```javascript
// Use ready-to-show event to prevent black borders
window.once('ready-to-show', () => {
  window.show();
});
window.loadFile('notification.html');
```

**CSS Critical Pattern:**
```css
.notification-card {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  /* Fills entire window, prevents border artifacts */
}
```

See `TRANSPARENT_WINDOW_GUIDE.md` for detailed troubleshooting.

### Advanced VoIP Notification Features
- **Large avatar** - 140×140px rounded corners
- **Live timer** - Real-time call duration
- **Call state management** - Tracks answer, video, screen share
- **Visual feedback** - Video button highlights when active
- **Connection quality** - Signal strength bars
- **Prepared for integration** - Ready for actual camera/screen APIs

## Security

- **Context Isolation**: Enabled (`contextIsolation: true`) to separate main and renderer processes
- **No Node Integration**: Disabled in renderer process (`nodeIntegration: false`)
- **Secure IPC Bridge**: Uses `contextBridge` to safely expose only needed APIs
- **Preload Scripts**:
  - `preload.js` - Exposes notification display methods
  - `preload-notification.js` - Minimal API for accept/decline actions
- **No Direct DOM Access**: All APIs are explicitly bridged

## Cross-Platform Support

### ✅ Fully Supported
| Platform | Native Notifications | Custom Notifications | Window Features |
|----------|---------------------|-------------------|-----------------|
| **macOS** | ✅ Full support | ✅ Full support | ✅ All features |
| **Windows** | ✅ Full support | ✅ Full support | ✅ All features |
| **Linux** | ✅ Full support | ✅ Full support | ✅ All features |

### Platform-Specific Notes

**macOS:**
- Requires macOS 10.12 (Sierra) or later
- Native notifications integrate with Notification Center
- `.icns` icon format recommended

**Windows:**
- Requires Windows 7 or later
- Native notifications appear in Action Center
- `.ico` icon format included

**Linux:**
- Requires GTK+ 3 or KDE Plasma 5
- Native notifications work with GNOME and KDE
- Uses D-Bus for notifications
- `.png` icon format included

## Technologies Used

- **Electron 37** - Cross-platform desktop application framework
- **Node.js 14+** - JavaScript runtime
- **HTML5/CSS3/JavaScript** - User interface and styling
- **IPC (Inter-Process Communication)** - Secure main ↔ renderer communication

## Development

### Enable DevTools
In `main.js`, uncomment line 23:
```javascript
mainWindow.webContents.openDevTools();
```

Then run `npm start` to see console logs and debug.

### Modify Notifications
Each notification type is a separate HTML file:
- `call-notification.html` - Light theme
- `dark-notification.html` - Dark theme
- `compact-dark-notification.html` - Minimal/compact
- `advanced-notification.html` - Full VoIP interface

Edit the HTML/CSS directly and restart the app with `npm start`.

### Testing Action Buttons
When you click Accept or Decline buttons, check the console for:
```
✓ Call accepted
✗ Call declined
```

Use DevTools (enabled above) to see all console messages.

## Notification Comparison

| Aspect | Native | Light | Dark | Compact | Advanced |
|--------|--------|-------|------|---------|----------|
| **Window Size** | N/A | 320×200 | 320×200 | 360×100 | 620×180 |
| **Integration** | System | Custom | Custom | Custom | Custom |
| **Actions** | Accept/Decline | Accept/Decline | Accept/Decline | Accept/Decline | Answer/Share/Video/End |
| **Avatar** | None | Small | Small | None | Large (140×140) |
| **Timer** | None | None | None | None | Live ✓ |
| **Animations** | System | Smooth | Smooth | Smooth | Smooth |
| **Use Case** | Quick alert | Simple calls | Dark theme | Compact UI | Rich VoIP |

## Troubleshooting

### Black Borders on Transparent Window
If you see black borders around notification windows:
1. Check that `show: false` is set in BrowserWindow options
2. Use `'ready-to-show'` event before calling `show()`
3. Ensure CSS uses absolute positioning: `position: absolute; top/left/right/bottom: 0`

**Full guide:** See [TRANSPARENT_WINDOW_GUIDE.md](./TRANSPARENT_WINDOW_GUIDE.md)

### Notifications Not Appearing
1. **macOS**: Check System Preferences > Notifications
2. **Windows**: Check Settings > System > Notifications
3. **Linux**: Check notification daemon is running (GNOME/KDE)

### Action Buttons Not Working
- On **Windows/macOS/Linux**: Click the "Show Advanced Notification" to test
- Open DevTools to see console logs
- Check that IPC handlers are registered in `main.js`

### Avatar Image Not Loading
- Ensure `avatar.png` exists in project root
- Path in `advanced-notification.html` should be: `<img src="avatar.png">`

### Performance Issues
- Custom notifications use about 50-100MB memory each
- Don't show more than 3-4 notification windows simultaneously
- Use native notifications when possible for better performance

## Resources

- **Electron Documentation**: https://www.electronjs.org/docs
- **Transparent Windows Guide**: [TRANSPARENT_WINDOW_GUIDE.md](./TRANSPARENT_WINDOW_GUIDE.md)
- **Source Code**: https://github.com/jeanfbrito/voip-poc

## Contributing

Feel free to fork and submit pull requests! This project is designed to be a reference implementation for VoIP notifications in Electron.

## Author

Jean ([@jeanfbrito](https://github.com/jeanfbrito))

## License

ISC
