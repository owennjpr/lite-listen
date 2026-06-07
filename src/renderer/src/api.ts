import { FileTreeNode } from '@lib/FileTreeNode'
import { Track, TrackFilters } from '@lib/schemas'

export type Api = {
  ping: () => Promise<string>
  mkdir: (path: string) => Promise<string>
  getPathForFile: (file: File) => string
  intakeFilePaths: (paths: string[]) => Promise<string>
  clearFileTree: () => void
  indexFileTree: (tree: FileTreeNode) => Promise<boolean>
  createTrack: (data: Omit<Track, 'id' | 'createdAt'>) => Track
  getTrackByID: (id: string) => Track
  getAllTracks: (filters: TrackFilters) => Track[]
  deleteTrackByID: (id: string) => void
}
export const useApi = (): Api => {
  return window.api as unknown as Api
}
