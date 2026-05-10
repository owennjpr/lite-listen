import { FileTreeNode } from '@lib/FileTreeNode'

export type Api = {
  ping: () => Promise<string>
  mkdir: (path: string) => Promise<string>
  getPathForFile: (file: File) => string
  intakeFilePaths: (paths: string[]) => Promise<string>
  clearFileTree: () => void
  indexFileTree: (tree: FileTreeNode) => Promise<boolean>
}
export const useApi = (): Api => {
  return window.api as unknown as Api
}
