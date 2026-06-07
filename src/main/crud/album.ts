import { Album } from '../../lib/schemas'
import { getDb } from '../db'
import { AlbumRow, toAlbum } from './mappers'

interface AlbumFilters {
  id?: string
  title?: string
  artistId?: string
}

export const getAlbums = (filters: AlbumFilters = {}): Album[] => {
  const db = getDb()

  const conditions: string[] = []
  const params: unknown[] = []

  if (filters.id) {
    conditions.push('id = ?')
    params.push(filters.id)
  }
  if (filters.title) {
    conditions.push('title = ?')
    params.push(filters.title)
  }
  if (filters.artistId) {
    conditions.push('artist_ids LIKE ?')
    params.push(`%"${filters.artistId}"%`)
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const rows = db.prepare(`SELECT * FROM albums ${where}`).all(...params)

  return (rows as AlbumRow[]).map(toAlbum)
}

export const insertAlbum = (data: Omit<Album, 'id' | 'createdAt'>): Album => {
  const db = getDb()
  const album: Album = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: Date.now()
  }
  db.prepare(
    `
    INSERT INTO albums (id, title, releasenumber, track_ids, artist_ids, folder_path, cover_path, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    album.id,
    album.title,
    album.releasenumber,
    JSON.stringify(album.trackIds),
    JSON.stringify(album.artistIds),
    album.folderPath,
    album.coverPath,
    album.createdAt
  )
  return album
}

export const deleteAlbum = (id: string): void => {
  const db = getDb()
  db.prepare('DELETE FROM albums WHERE id = ?').run(id)
}
