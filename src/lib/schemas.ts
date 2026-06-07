// PRIMARY ENTITIES
// PRIMARY ENTITIES
// PRIMARY ENTITIES

export interface Track {
  // Core
  id: string
  path: string
  title: string
  duration: number
  sampleRate: number
  releaseDate: string
  coverPath: string | null
  createdAt: number
  // Album
  albumId: string | null
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

// FILTERS
export interface TrackFilters {
  id?: string
  title?: string
  albumId?: string
}

export interface AlbumFilters {
  id?: string
  title?: string
  artistId?: string
}

export interface ArtistFilters {
  id?: string
  name?: string
}

export interface PlaylistFilters {
  id?: string
  title?: string
}
