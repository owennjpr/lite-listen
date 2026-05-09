import { create } from 'zustand'
import { FileTreeNode } from '@lib/FileTreeNode'
type FileTreeInputStore = {
  fileTree: FileTreeNode | null
  setFileTree: (fileTree: FileTreeNode) => void
  clearFileTree: () => void
}

export const useFileTreeInput = create<FileTreeInputStore>((set) => ({
  fileTree: null,
  setFileTree: (fileTree) => set({ fileTree: fileTree }),
  clearFileTree: () => set({ fileTree: null })
}))
