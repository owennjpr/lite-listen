import { ipcMain } from 'electron'
import { mkdir, intakeFilePaths, indexFileTree } from './filesystem'
import { FileTreeNode } from '../lib/FileTreeNode'
export const registerIpcHandlers = (): void => {
  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('mkdir', (_event, path: string) => mkdir(path))
  ipcMain.handle('intakeFilePaths', (_event, paths: string[]) => intakeFilePaths(paths))
  ipcMain.handle('indexFileTree', (_event, tree: FileTreeNode) => indexFileTree(tree))
}
