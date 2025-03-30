const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    'ipc', {
        postMessage: (channel, ...args) => {
            const validChannels = ['search', 'navigate'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, ...args);
            }
        },
        receive: (channel, func) => {
            const validChannels = ['perform-search', 'perform-navigation'];
            if (validChannels.includes(channel)) {
                // Deliberately strip the event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
); 