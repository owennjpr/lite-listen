import { Playlist, PlaylistFilters } from '../../lib/schemas'
import { getDb } from '../db'
import { PlaylistRow, toPlaylist } from './mappers'

export const getPlaylists = (filters: PlaylistFilters = {}): Playlist[] => {
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

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  return (db.prepare(`SELECT * FROM playlists ${where}`).all(...params) as PlaylistRow[]).map(
    toPlaylist
  )
}

export const insertPlaylist = (
  data: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>
): Playlist => {
  const db = getDb()
  const playlist: Playlist = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
  db.prepare(
    `
    INSERT INTO playlists (id, title, description, created_at, updated_at, track_ids)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  ).run(
    playlist.id,
    playlist.title,
    playlist.description,
    playlist.createdAt,
    playlist.updatedAt,
    JSON.stringify(playlist.trackIds)
  )

  return playlist
}

export const updatePlaylist = (data: Omit<Playlist, 'updatedAt'>): Playlist => {
  const db = getDb()
  const playlist: Playlist = {
    ...data,
    updatedAt: Date.now()
  }
  db.prepare(
    `
    UPDATE playlists SET title = ?, description = ?, updated_at = ?, track_ids = ?
    WHERE id = ?
  `
  ).run(
    playlist.title,
    playlist.description,
    playlist.updatedAt,
    JSON.stringify(playlist.trackIds),
    playlist.id
  )
  return playlist
}

export const deletePlaylist = (id: string): void => {
  const db = getDb()
  db.prepare('DELETE FROM playlists WHERE id = ?').run(id)
}
