const { app, BrowserWindow, ipcMain, Notification, screen } = require('electron');
const path = require('path');

let mainWindow;
let customNotificationWindow;
let darkNotificationWindow;
let compactNotificationWindow;
let advancedNotificationWindow;

// Create main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 520,
    height: 500,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
  // Uncomment to open DevTools
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * Create custom notification window
 *
 * IMPORTANT: Transparent Window Implementation
 * ============================================
 * This window uses several patterns to avoid rendering artifacts (black borders):
 *
 * 1. show: false - Start hidden, don't show until renderer is ready
 * 2. ready-to-show event - Wait for Electron's renderer to be fully initialized
 * 3. loadFile() AFTER ready-to-show handler - Load file after event is registered
 *
 * DO NOT use: loadFile().then(() => show())
 * This shows the window before the renderer is ready, causing black borders.
 *
 * See TRANSPARENT_WINDOW_GUIDE.md for complete troubleshooting guide.
 */
function createCustomNotification() {
  // Close previous notification if exists
  if (customNotificationWindow) {
    customNotificationWindow.close();
  }

  customNotificationWindow = new BrowserWindow({
    width: 320,
    height: 200,
    frame: false,        // Remove window frame
    transparent: true,   // Enable transparency
    alwaysOnTop: true,   // Always on top of other windows
    skipTaskbar: true,   // Don't show in dock
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    hasShadow: true,     // Keep shadow for macOS aesthetic
    show: false,         // CRITICAL: Start hidden
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload-notification.js')
    }
  });

  // Position at top-right of primary display
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  customNotificationWindow.setPosition(width - 340, 20);

  /**
   * CRITICAL: Use ready-to-show event to wait for renderer initialization
   * This is the key to avoiding black borders on transparent windows
   * See: TRANSPARENT_WINDOW_GUIDE.md
   */
  customNotificationWindow.once('ready-to-show', () => {
    if (customNotificationWindow) {
      customNotificationWindow.show();
      customNotificationWindow.focus();
    }
  });

  // Load HTML file AFTER registering ready-to-show handler
  customNotificationWindow.loadFile('call-notification.html');
  customNotificationWindow.setAlwaysOnTop(true, 'floating', 1);

  customNotificationWindow.on('closed', () => {
    customNotificationWindow = null;
  });
}

/**
 * Create dark mode notification window
 * Same as custom notification but with dark theme styling
 */
function createDarkNotification() {
  // Close previous notification if exists
  if (darkNotificationWindow) {
    darkNotificationWindow.close();
  }

  darkNotificationWindow = new BrowserWindow({
    width: 320,
    height: 200,
    frame: false,        // Remove window frame
    transparent: true,   // Enable transparency
    alwaysOnTop: true,   // Always on top of other windows
    skipTaskbar: true,   // Don't show in dock
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    hasShadow: true,     // Keep shadow for macOS aesthetic
    show: false,         // CRITICAL: Start hidden
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload-notification.js')
    }
  });

  // Position at top-right of primary display
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  darkNotificationWindow.setPosition(width - 340, 20);

  /**
   * CRITICAL: Use ready-to-show event to wait for renderer initialization
   * This is the key to avoiding black borders on transparent windows
   * See: TRANSPARENT_WINDOW_GUIDE.md
   */
  darkNotificationWindow.once('ready-to-show', () => {
    if (darkNotificationWindow) {
      darkNotificationWindow.show();
      darkNotificationWindow.focus();
    }
  });

  // Load HTML file AFTER registering ready-to-show handler
  darkNotificationWindow.loadFile('dark-notification.html');
  darkNotificationWindow.setAlwaysOnTop(true, 'floating', 1);

  darkNotificationWindow.on('closed', () => {
    darkNotificationWindow = null;
  });
}

/**
 * Create compact dark notification window
 * Minimal size (~360x100px) matching native macOS notification
 */
function createCompactNotification() {
  // Close previous notification if exists
  if (compactNotificationWindow) {
    compactNotificationWindow.close();
  }

  compactNotificationWindow = new BrowserWindow({
    width: 360,
    height: 100,
    frame: false,        // Remove window frame
    transparent: true,   // Enable transparency
    alwaysOnTop: true,   // Always on top of other windows
    skipTaskbar: true,   // Don't show in dock
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    hasShadow: true,     // Keep shadow for macOS aesthetic
    show: false,         // CRITICAL: Start hidden
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload-notification.js')
    }
  });

  // Position at top-right of primary display
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  compactNotificationWindow.setPosition(width - 380, 20);

  /**
   * CRITICAL: Use ready-to-show event to wait for renderer initialization
   * This is the key to avoiding black borders on transparent windows
   * See: TRANSPARENT_WINDOW_GUIDE.md
   */
  compactNotificationWindow.once('ready-to-show', () => {
    if (compactNotificationWindow) {
      compactNotificationWindow.show();
      compactNotificationWindow.focus();
    }
  });

  // Load HTML file AFTER registering ready-to-show handler
  compactNotificationWindow.loadFile('compact-dark-notification.html');
  compactNotificationWindow.setAlwaysOnTop(true, 'floating', 1);

  compactNotificationWindow.on('closed', () => {
    compactNotificationWindow = null;
  });
}

/**
 * Create advanced rich notification window
 * Large size (~500x300px) with avatar, multiple action buttons, and call info
 */
function createAdvancedNotification() {
  // Close previous notification if exists
  if (advancedNotificationWindow) {
    advancedNotificationWindow.close();
  }

  advancedNotificationWindow = new BrowserWindow({
    width: 620,
    height: 180,
    frame: false,        // Remove window frame
    transparent: true,   // Enable transparency
    alwaysOnTop: true,   // Always on top of other windows
    skipTaskbar: true,   // Don't show in dock
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    hasShadow: true,     // Keep shadow for macOS aesthetic
    show: false,         // CRITICAL: Start hidden
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload-notification.js')
    }
  });

  // Position at top-right of primary display
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  advancedNotificationWindow.setPosition(width - 640, 20);

  /**
   * CRITICAL: Use ready-to-show event to wait for renderer initialization
   * This is the key to avoiding black borders on transparent windows
   * See: TRANSPARENT_WINDOW_GUIDE.md
   */
  advancedNotificationWindow.once('ready-to-show', () => {
    if (advancedNotificationWindow) {
      advancedNotificationWindow.show();
      advancedNotificationWindow.focus();
    }
  });

  // Load HTML file AFTER registering ready-to-show handler
  advancedNotificationWindow.loadFile('advanced-notification.html');
  advancedNotificationWindow.setAlwaysOnTop(true, 'floating', 1);

  advancedNotificationWindow.on('closed', () => {
    advancedNotificationWindow = null;
  });
}

// Show native macOS notification
function showNativeNotification() {
  const notification = new Notification({
    title: 'Incoming Call',
    body: 'John Doe',
    icon: path.join(__dirname, 'icon.png'),
    silent: false,
    actions: [
      { type: 'button', text: 'Accept' },
      { type: 'button', text: 'Decline' }
    ],
    hasReply: false
  });

  notification.show();

  notification.on('action', (event, index) => {
    if (index === 0) {
      console.log('✓ Native notification: Call accepted');
    } else if (index === 1) {
      console.log('✗ Native notification: Call declined');
    }
  });

  notification.on('click', () => {
    console.log('Native notification clicked');
  });

  notification.on('close', () => {
    console.log('Native notification closed');
  });
}

// IPC Handlers
ipcMain.on('show-native-notification', () => {
  showNativeNotification();
});

ipcMain.on('show-custom-notification', () => {
  createCustomNotification();
});

ipcMain.on('show-dark-notification', () => {
  createDarkNotification();
});

ipcMain.on('show-compact-notification', () => {
  createCompactNotification();
});

ipcMain.on('show-advanced-notification', () => {
  createAdvancedNotification();
});

ipcMain.on('accept-call', (event) => {
  console.log('✓ Call accepted');
  if (customNotificationWindow) {
    customNotificationWindow.close();
  }
  if (darkNotificationWindow) {
    darkNotificationWindow.close();
  }
  if (compactNotificationWindow) {
    compactNotificationWindow.close();
  }
  if (advancedNotificationWindow) {
    advancedNotificationWindow.close();
  }
});

ipcMain.on('decline-call', (event) => {
  console.log('✗ Call declined');
  if (customNotificationWindow) {
    customNotificationWindow.close();
  }
  if (darkNotificationWindow) {
    darkNotificationWindow.close();
  }
  if (compactNotificationWindow) {
    compactNotificationWindow.close();
  }
  if (advancedNotificationWindow) {
    advancedNotificationWindow.close();
  }
});

// App lifecycle
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
