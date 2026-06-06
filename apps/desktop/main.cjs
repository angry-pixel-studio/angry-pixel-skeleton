const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const VITE_DEV_URL = 'http://localhost:3000';

/** Same file used by electron-builder (`build.icon` in package.json) for the .app / installer icon. */
function getIconPath() {
  return path.join(__dirname, 'build', 'icon.png');
}

function createWindow() {
  const iconPath = getIconPath();
  const hasIcon = fs.existsSync(iconPath);

  const win = new BrowserWindow({
    fullscreen: true,
    resizable: false,
    // macOS ignores BrowserWindow.icon; Dock icon comes from the bundled app (electron-builder) or app.dock.setIcon in dev.
    ...(hasIcon && process.platform !== 'darwin' ? { icon: iconPath } : {}),
    width: 1280,
    height: 720,
    webPreferences: {
      devTools: false,
      webgl: true,
      contextIsolation: true,
      autoplayPolicy: 'no-user-gesture-required',
    },
  });

  const useDevServer = app.isPackaged ? false : process.env.ELECTRON_USE_DIST !== '1';

  if (useDevServer) {
    win.loadURL(VITE_DEV_URL);
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    const indexHtml = app.isPackaged
      ? path.join(__dirname, 'renderer', 'index.html')
      : path.join(__dirname, '../browser/dist/index.html');
    win.loadFile(indexHtml);
  }

  win.maximize();
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  const iconPath = getIconPath();
  if (process.platform === 'darwin' && !app.isPackaged && fs.existsSync(iconPath)) {
    app.dock.setIcon(iconPath);
  }

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
