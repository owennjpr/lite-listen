import { Album, Artist, Playlist, Track } from '../../lib/schemas'

export interface AlbumRow {
  id: string
  title: string
  releasenumber: string
  track_ids: string
  artist_ids: string
  folder_path: string
  cover_path: string | null
  created_at: number
}

export const toAlbum = (row: AlbumRow): Album => ({
  id: row.id,
  title: row.title,
  releasenumber: row.releasenumber,
  trackIds: JSON.parse(row.track_ids),
  artistIds: JSON.parse(row.artist_ids),
  folderPath: row.folder_path,
  coverPath: row.cover_path,
  createdAt: row.created_at
})

export interface ArtistRow {
  id: string
  name: string
  created_at: number
  album_ids: string
  track_ids: string
  website: string | null
}

export const toArtist = (row: ArtistRow): Artist => ({
  id: row.id,
  name: row.name,
  createdAt: row.created_at,
  albumIds: JSON.parse(row.album_ids),
  trackIds: JSON.parse(row.track_ids),
  website: row.website
})

export interface TrackRow {
  id: string
  path: string
  title: string
  duration: number
  sample_rate: number
  release_date: string
  cover_path: string | null
  created_at: number
  album_id: string
  track_number: number
  artist_ids: string
}

export const toTrack = (row: TrackRow): Track => ({
  id: row.id,
  path: row.path,
  title: row.title,
  duration: row.duration,
  sampleRate: row.sample_rate,
  releaseDate: row.release_date,
  coverPath: row.cover_path,
  createdAt: row.created_at,
  albumId: row.album_id,
  trackNumber: row.track_number,
  artistIds: JSON.parse(row.artist_ids)
})

export interface PlaylistRow {
  id: string
  title: string
  description: string | null
  created_at: number
  updated_at: number
  track_ids: string
}

export const toPlaylist = (row: PlaylistRow): Playlist => ({
  id: row.id,
  title: row.title,
  description: row.description,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  trackIds: JSON.parse(row.track_ids)
})
