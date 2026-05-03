import { app } from 'electron'
import fs from 'node:fs/promises'
import { ParseFileKind } from './utils'
import { FileTreeNode } from '../lib/FileTreeNode'
import { FileKinds } from '../lib/types'

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
    console.log('folder')
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
  console.log('intakeFilePaths')
  const children: FileTreeNode[] = []
  for (const p of paths) {
    console.log('p' + p)
    const subTree = await intakeFilePathsRec(p)
    children.push(subTree)
  }

  return new FileTreeNode('root', FileKinds.DIRECTORY, null, children)
}
