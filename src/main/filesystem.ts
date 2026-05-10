import { app } from 'electron'
import fs from 'node:fs/promises'
import { ParseFileKind } from './utils'
import { FileTreeNode } from '../lib/FileTreeNode'
import { FileKinds } from '../lib/types'
import { clearPendingScan, getPendingScan, storePendingScan } from './scanner'

export const mkdir = async (path: string): Promise<string> => {
  const prefix = app.getPath('userData')
  const full_path = prefix + path
  fs.mkdir(full_path, { recursive: true })
  return full_path
}

export const intakeFilePathsRec = async (path: string): Promise<FileTreeNode> => {
  const stat = await fs.stat(path)

  // get fields
  const { name, kind, ext } = ParseFileKind(path)
  const children: FileTreeNode[] = []

  // directories recurse
  if (stat.isDirectory()) {
    const dir = await fs.opendir(path)

    for await (const entity of dir) {
      const entPath = entity.parentPath + '/' + entity.name
      const subTree = await intakeFilePathsRec(entPath)
      children.push(subTree)
    }
  }
  return new FileTreeNode(name, kind, ext, children)
}

export const intakeFilePaths = async (paths: string[]): Promise<FileTreeNode> => {
  const children: FileTreeNode[] = []
  for (const p of paths) {
    const subTree = await intakeFilePathsRec(p)
    children.push(subTree)
  }
  const scan = new FileTreeNode('root', FileKinds.DIRECTORY, null, children)
  storePendingScan(scan)
  return scan
}

export const clearFileTree = (): void => {
  clearPendingScan()
}

export const indexFileTree = async (): Promise<boolean> => {
  const tree = getPendingScan()
  if (!tree) return false
  console.log('indexFileTree: ' + tree)
  return true
}
