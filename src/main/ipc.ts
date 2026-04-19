import { ipcMain } from 'electron'
import { mkdir, intakeFilePaths } from './filesystem'
export const registerIpcHandlers = (): void => {
  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('mkdir', (_event, path: string) => mkdir(path))
  ipcMain.handle('intakeFilePaths', (_event, paths: string[]) => intakeFilePaths(paths))
}
