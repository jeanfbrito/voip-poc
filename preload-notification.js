const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  acceptCall: () => ipcRenderer.send('accept-call'),
  declineCall: () => ipcRenderer.send('decline-call')
});
