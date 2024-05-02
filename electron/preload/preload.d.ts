import type { IpcRenderer } from "electron"

export interface IElectronAPI {
  ipcRenderer: IpcRenderer
}

declare global {
  interface Window {
    electron: IElectronAPI
  }
}


