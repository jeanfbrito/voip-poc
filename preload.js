const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showNativeNotification: () => ipcRenderer.send('show-native-notification'),
  showCustomNotification: () => ipcRenderer.send('show-custom-notification'),
  showDarkNotification: () => ipcRenderer.send('show-dark-notification'),
  showCompactNotification: () => ipcRenderer.send('show-compact-notification'),
  acceptCall: () => ipcRenderer.send('accept-call'),
  declineCall: () => ipcRenderer.send('decline-call')
});
