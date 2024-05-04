import { app, BrowserWindow, ipcMain,protocol} from 'electron'
import envConfig from '../config/envConfig'
import { info } from 'electron-log'
import { getFileList } from '../common/fileUtils.js'
import { runAppInBackground, openProgram } from '../common/localOprea'
const fs = require('fs')
const path = require('path')


// build 打包运行时；start 开发运行时
const runtime_type = app.isPackaged ? 'build' : 'start'

// icon 图片地址
const iconUrl = app.isPackaged ? path.join(__dirname, '../dist-icon/icons/icon.ico') : './public/favicon.ico'

const browserOps = {
  width: 1350,
  height: 900,
  minWidth: 1350,
  minHeight: 900,
  // 不展示渲染窗口
  show: false,
  // 关闭选项栏
  autoHideMenuBar: true,
  // 定义图标
  icon: iconUrl,
  // 全屏
  // fullscreen: true,
  webPreferences: {
    // 书写渲染进程中的配置
    nodeIntegration: true, //开启true这一步很重要,目的是为了vue文件中可以引入node和electron相关的API
    nodeIntegrationInWorker: true,
    nodeIntegrationInSubFrames: true,
    contextIsolation: false, // 启用上下文隔离 默认为 true
    preload: path.join(__dirname, '../preload/index.js'),
    webSecurity: false, //========关闭安全策略===========
    webviewTag:true

  }
}

app.whenReady().then(() => {
  const mainWin = new BrowserWindow(browserOps)

  if (!app.isPackaged) {
    mainWin.loadURL(envConfig[runtime_type].VITE_APP_URL)
    // 启动时打开开发者工具
    // mainWin.webContents.openDevTools({mode: "detach"})
  } else {
    info('地址', __dirname)
    mainWin.loadFile(envConfig[runtime_type].VITE_APP_URL)
  }

  // 监听页面的显示
  mainWin.on('ready-to-show', () => {
    // 显示窗口
    mainWin.show()
  })


  // 注册协议
  // 注册自定义协议，例如 'myapp'
  protocol.registerFileProtocol('myapp', (request, callback) => {
    console.log(request,'url')
    const url = request.url.substr(8); // 去掉协议头 'myapp://'
    const decodedUrl = decodeURIComponent(url); // 解码 URL
    try {
      // 返回图片的本地路径
      console.log(decodedUrl,'de')
      return callback(decodedUrl);
    } catch (error) {
      console.error('Failed to register protocol', error);
    }
  });




})

// 定义关闭事件
ipcMain.handle('quit', () => {
  app.quit()
})

ipcMain.on('msg', (event, data) => {
  console.log(data)
  getFileList()
})


ipcMain.on('getFileListByType', async (event, data) => {
  // console.log(data)
  const { path } = data
  const files = await getFileList(path)
  event.sender.send('reply', { data: files })
  // event.sender.send() 参数1：回复时触发方法的名称，参数2：要回复的数据
  // runAppInBackground('/System/Applications/Calculator.app/Contents/MacOS/Calculator')
  // execll()
})

ipcMain.on('openFile', async (event, data) => {
  console.log(data)
  const { filePath } = data
  openProgram(filePath)
})


ipcMain.handle('get-images', async (event, dirPath) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const files = fs.readdirSync(dirPath);
  const images = files.filter((file) =>
    imageExtensions.includes(path.extname(file).toLowerCase().slice(1)))
    .map((file) => {
      return {src: `${dirPath}/${file}`}
    });
  return images;
})


