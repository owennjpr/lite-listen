export interface Track {
  // Core
  id: string
  path: string
  title: string
  duration: number
  releaseDate: string
  coverPath: string | null
  createdAt: number
  // Album
  albumId: string
  trackNumber: number
  // Artist
  artistIds: string[]
}

export interface Album {
  id: string
  title: string
  releasenumber: string
  trackIds: string[]
  artistIds: string[]
  folderPath: string
  coverPath: string | null
  createdAt: number
}

export interface Artist {
  id: string
  name: string
  createdAt: number
  albumIds: string[]
  trackIds: string[]
  // files from bandcamp store artist url in "Comments"
  website: string | null
}

export interface Playlist {
  id: string
  title: string
  description: string | null
  createdAt: number
  updatedAt: number
  trackIds: string[]
}

export interface FileTreeNode {
  name: string
  format: string
  children: FileTreeNode[]
}
