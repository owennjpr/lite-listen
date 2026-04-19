import { contextBridge, ipcRenderer, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  ping: () => ipcRenderer.invoke('ping'),
  mkdir: (path: string) => ipcRenderer.invoke('mkdir', path),
  getPathForFile: (file: File) => webUtils.getPathForFile(file),
  intakeFilePaths: (paths: string[]) => ipcRenderer.invoke('intakeFilePaths', paths)
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
