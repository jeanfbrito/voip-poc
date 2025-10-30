# Transparent Window Implementation Guide

## Problem: Black Borders on Transparent Frameless Windows

When implementing a transparent, frameless notification window in Electron, you may encounter **black borders** or rendering artifacts around the edges of your content.

### Root Cause

The issue occurs because of the timing between:
1. **Window rendering** - Electron's renderer needs to be fully initialized
2. **Content loading** - DOM must be fully parsed and painted
3. **Window display** - Showing the window before both are ready causes artifacts

When a transparent window is shown before the renderer is completely ready, Electron renders a black placeholder background, which appears as borders.

## Solution: Use `ready-to-show` Event

### ❌ What NOT to do:

```javascript
// BAD: Shows window before renderer is ready
customNotificationWindow.loadFile('call-notification.html').then(() => {
  customNotificationWindow.show();
});
```

### ✅ What TO do:

```javascript
// GOOD: Wait for ready-to-show event
customNotificationWindow.once('ready-to-show', () => {
  if (customNotificationWindow) {
    customNotificationWindow.show();
    customNotificationWindow.focus();
  }
});

customNotificationWindow.loadFile('call-notification.html');
customNotificationWindow.setAlwaysOnTop(true, 'floating', 1);
```

## CSS Implementation for Transparent Windows

### ❌ What NOT to do:

```css
body {
  background: transparent;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-card {
  /* Content centered but doesn't fill window */
}
```

### ✅ What TO do:

```css
body {
  background: transparent;
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow: hidden;
  border-radius: 16px;
}

.notification-card {
  /* Fill entire window with absolute positioning */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Then center content inside */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Style the card itself */
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 16px;
  width: 100%;
  height: 100%;
  animation: slideDown 0.4s ease-out;
}
```

## Key Principles

### 1. **Absolute Positioning for Full-Window Content**
- Use `position: absolute` with `top: 0; left: 0; right: 0; bottom: 0;` to fill the window
- This ensures proper rendering by Electron

### 2. **Ready-to-Show Event**
- Always use `'ready-to-show'` event for transparent windows
- This guarantees the renderer is fully initialized
- Prevents black borders and artifacts

### 3. **Content Inside Absolute Element**
- Place visible content inside the absolutely-positioned container
- Use flexbox inside to center content
- The absolute element fills the window, not its children

### 4. **Proper Styling Hierarchy**
```
html (transparent)
  └─ body (transparent, overflow: hidden)
      └─ .container (position: absolute, fills window)
          └─ content (centered with flexbox)
```

## Window Configuration

```javascript
const customNotificationWindow = new BrowserWindow({
  width: 320,
  height: 172,
  frame: false,                    // Remove window frame
  transparent: true,               // Enable transparency
  alwaysOnTop: true,              // Keep above other windows
  skipTaskbar: true,              // Don't show in dock
  resizable: false,
  minimizable: false,
  maximizable: false,
  fullscreenable: false,
  hasShadow: true,                // Keep shadow for macOS aesthetic
  show: false,                    // Start hidden
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload-notification.js')
  }
});

// IMPORTANT: Use ready-to-show event
customNotificationWindow.once('ready-to-show', () => {
  if (customNotificationWindow) {
    customNotificationWindow.show();
    customNotificationWindow.focus();
  }
});

customNotificationWindow.loadFile('call-notification.html');
```

## Testing the Fix

When implementing a transparent notification window:

1. **Check for black borders** - Should see only the rounded card, no black frame
2. **Verify transparency** - Background should be fully transparent
3. **Test positioning** - Window should appear at correct location
4. **Confirm animations** - Slide-down animation should be smooth
5. **Verify shadow** - Drop shadow should appear correctly

## References

- Pattern adapted from: `/Users/jean/Github/whats-next-meet-electron`
- See `whats-next-meet-electron/src/main/window.ts` for working floating window implementation
- Electron documentation: https://www.electronjs.org/docs/api/browser-window

## Common Issues

### Issue: Black borders still visible
**Solution:** Check that you're using `'ready-to-show'` event, not `loadFile().then()`

### Issue: Content not filling window
**Solution:** Use `position: absolute` with full size, not flexbox on body

### Issue: Rounded corners clipped
**Solution:** Set `border-radius` on the content container, not just body

### Issue: Window shows behind other windows
**Solution:** Call `setAlwaysOnTop(true, 'floating', 1)` after `loadFile()`
