import { ipcMain } from 'electron'
import { mkdir, intakeFilePaths, indexFileTree, clearFileTree } from './filesystem'
export const registerIpcHandlers = (): void => {
  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('mkdir', (_event, path: string) => mkdir(path))
  ipcMain.handle('intakeFilePaths', (_event, paths: string[]) => intakeFilePaths(paths))
  ipcMain.handle('clearFileTree', () => clearFileTree())
  ipcMain.handle('indexFileTree', () => indexFileTree())
}
