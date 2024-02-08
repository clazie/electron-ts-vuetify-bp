import { app, BrowserWindow, ipcMain, screen } from 'electron'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.whenReady().then(() => {
  let xb = screen.getPrimaryDisplay().bounds.x;
  let yb = screen.getPrimaryDisplay().bounds.y;
  const Displays = screen.getAllDisplays()
  if (Displays.length > 1){
    console.log(Displays.length);
    console.log(Displays[0].size);
    console.log(Displays[1].size);
    console.log(Displays[0].id);
    console.log(Displays[1].id);
    console.log(Displays[0].bounds);
    console.log(Displays[1].bounds);
    xb = Displays[1].bounds.x; //Fullscreen on second monitor
    yb = Displays[1].bounds.y; //Fullscreen on second monitor
  }

  const win = new BrowserWindow({
    frame: false,
    fullscreen: true, //fullscreen : true uses the whole screen without Frame and buttons on the top of the application.
    width: 1500,
    height: 900,
    minHeight: 400,
    minWidth: 300,
    x: xb + 10,
    y: yb + 10,
    icon: join(__dirname, '../public/favicon.ico'),
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#f3f3f300',
      symbolColor: '#434343',
      height: 30,
    },
    webPreferences: {
      preload: join(__dirname, 'preload.mjs'),
    },
  })

  ipcMain.handle('darkMode:toggle', (event, dark: boolean) => {
    win.setTitleBarOverlay(
      dark
        ? { color: '#21212100', symbolColor: '#999999' }
        : { color: '#f3f3f300', symbolColor: '#434343' },
    )
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.webContents.openDevTools()
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html')
  }
})

app.on('browser-window-created', (e, win) => {
  win.removeMenu()
})
