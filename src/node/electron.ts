import { app, BrowserWindow } from 'electron';
import childProcess from 'child_process';
import express from 'express';
import detectPort from 'detect-port';
import bodyParser from 'body-parser';
import cors from 'cors';

import createWindow from './create-window';
import { updateApplicationMenu } from './application-menu';
import { enableContextMenu } from './context-menu';

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

const main = async () => {
  const port = await detectPort(6789);
  const subprocess = childProcess.spawn('./ngrok', ['http', port.toString(), '--log=stdout']);
  subprocess.stdout.on('data', (data) => {
    const log = data.toString();
    console.log(log);
    const matches = log.match(/:4040/);
    if (matches) {
      BrowserWindow.getAllWindows().forEach((window) => {
        window.loadURL('http://localhost:4040');
      });

      const webApp = express();
      webApp.use(bodyParser.json());
      webApp.use(bodyParser.urlencoded({ extended: true }));
      webApp.use(cors());
      webApp.get('/webhook', async (req, res) => {
        res.send('response from webhook');
      });
      webApp.post('/webhook', async (req, res) => {
        res.header('validation-token', req.header('validation-token'));
        res.send('response from webhook');
      });
      webApp.listen(port);
    }
  });
};
main();
