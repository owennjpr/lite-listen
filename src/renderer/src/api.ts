import { FileTreeNode } from '@lib/FileTreeNode'

export type Api = {
  ping: () => Promise<string>
  mkdir: (path: string) => Promise<string>
  getPathForFile: (file: File) => string // sync
  intakeFilePaths: (paths: string[]) => Promise<string>
  indexFileTree: (tree: FileTreeNode) => Promise<void>
}
export const useApi = (): Api => {
  return window.api as unknown as Api
}
