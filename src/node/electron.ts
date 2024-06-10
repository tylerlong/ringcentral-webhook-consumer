import { app, BrowserWindow, webContents } from 'electron';
import childProcess from 'child_process';

import createWindow from './create-window';
import { updateApplicationMenu } from './application-menu';
import { enableContextMenu } from './context-menu';
import CONSTS from '../constants';

app.whenReady().then(() => {
  updateApplicationMenu();
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

// for both the main window and the settings window
app.on('browser-window-created', (event, browserWindow) => {
  enableContextMenu(browserWindow);
  if (!app.isPackaged) {
    // for development debugging purpose only
    browserWindow.webContents.openDevTools();
  }
});

const subprocess = childProcess.spawn('./ngrok', ['http', '6789', '--log=stdout']);
subprocess.stdout.on('data', (data) => {
  const log = data.toString();
  console.log(log);
  const matches = log.match(/url=(.+)/);
  if (matches) {
    const publicUrl = matches[1];
    webContents.getAllWebContents().forEach((webContent) => {
      webContent.send(CONSTS.PUBLIC_URL, publicUrl);
    });
  }
});
