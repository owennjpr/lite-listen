import { FileTreeNode } from '../lib/FileTreeNode'

let pendingScan: FileTreeNode | null = null

export const storePendingScan = (tree: FileTreeNode): void => {
  pendingScan = tree
}

export const getPendingScan = (): FileTreeNode | null => {
  return pendingScan
}

export const clearPendingScan = (): void => {
  pendingScan = null
}
