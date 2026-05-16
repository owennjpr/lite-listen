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

export const writeFile = async (path: string, data: string): Promise<boolean> => {
  try {
    const prefix = app.getPath('userData')
    const full_path = prefix + path
    //console.log(full_path)
    await fs.writeFile(full_path, data)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
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
  return new FileTreeNode(name, kind, ext, children, path)
}

export const intakeFilePaths = async (paths: string[]): Promise<FileTreeNode> => {
  const children: FileTreeNode[] = []
  for (const p of paths) {
    const subTree = await intakeFilePathsRec(p)
    children.push(subTree)
  }
  const scan = new FileTreeNode('new files:', FileKinds.DIRECTORY, null, children)
  storePendingScan(scan)
  FileTreeNode.print(scan)
  const cleaned = FileTreeNode.cleanPaths(scan)
  return cleaned
}

export const clearFileTree = (): void => {
  clearPendingScan()
}

export const indexFileTreeRec = async (tree: FileTreeNode | null): Promise<boolean> => {
  if (tree === null) return true

  switch (tree.kind) {
    case FileKinds.AUDIO:
      writeFile(`/index/tracks/${tree.name}.json`, 'test')
      break
    case FileKinds.IMAGE:
      writeFile(`/index/covers/${tree.name}.json`, 'test')
      break
    case FileKinds.DIRECTORY:
      if (tree.children) {
        tree.children.map(indexFileTreeRec)
      }
      break
    default:
      break
  }
  return true
}

export const indexFileTree = async (): Promise<boolean> => {
  const tree = getPendingScan()
  if (!tree) return false

  await mkdir('/index/tracks')
  await mkdir('/index/covers')

  return indexFileTreeRec(tree)
}
