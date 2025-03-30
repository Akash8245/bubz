const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { session } = require('electron');

let win;

function createWindow() {
    const ses = session.fromPartition('persist:bubz');
    
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true,
            webSecurity: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
    
    win.on('closed', () => {
        win = null;
    });
}

app.whenReady().then(createWindow);

ipcMain.on('search', (event, query) => {
    if (win) {
        win.webContents.send('perform-search', query);
    }
});

ipcMain.on('navigate', (event, url) => {
    if (win) {
        win.webContents.send('perform-navigation', url);
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
