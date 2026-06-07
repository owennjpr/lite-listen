import { Artist, ArtistFilters } from '../../lib/schemas'
import { getDb } from '../db'
import { ArtistRow, toArtist } from './mappers'

export const getArtists = (filters: ArtistFilters = {}): Artist[] => {
  const db = getDb()
  const conditions: string[] = []
  const params: unknown[] = []

  if (filters.id) {
    conditions.push('id = ?')
    params.push(filters.id)
  }
  if (filters.name) {
    conditions.push('name = ?')
    params.push(filters.name)
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  return (db.prepare(`SELECT * FROM artists ${where}`).all(...params) as ArtistRow[]).map(toArtist)
}

export const insertArtist = (data: Omit<Artist, 'id' | 'createdAt'>): Artist => {
  const db = getDb()
  const artist: Artist = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: Date.now()
  }
  db.prepare(
    `
    INSERT INTO artists (id, name, created_at, album_ids, track_ids, website)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  ).run(
    artist.id,
    artist.name,
    artist.createdAt,
    JSON.stringify(artist.albumIds),
    JSON.stringify(artist.trackIds),
    artist.website
  )

  return artist
}

export const deleteArtist = (id: string): void => {
  const db = getDb()
  db.prepare('DELETE FROM artists WHERE id = ?').run(id)
}
