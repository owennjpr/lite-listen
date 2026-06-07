import { Track } from '../../lib/schemas'
import { getDb } from '../db'
import { toTrack, TrackRow } from './mappers'

interface TrackFilters {
  id?: string
  title?: string
  albumId?: string
}

export const getTracks = (filters: TrackFilters): Track[] => {
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
  if (filters.albumId) {
    conditions.push('album_id = ?')
    params.push(filters.albumId)
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const rows = db.prepare(`SELECT * FROM tracks ${where}`).all(...params)
  return (rows as TrackRow[]).map(toTrack)
}

export const insertTrack = (data: Omit<Track, 'id' | 'createdAt'>): Track => {
  const db = getDb()
  const track: Track = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: Date.now()
  }
  db.prepare(
    `
    INSERT INTO tracks (id, path, title, duration, sample_rate, release_date, cover_path, created_at, album_id, track_number, artist_ids)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    track.id,
    track.path,
    track.title,
    track.duration,
    track.sampleRate,
    track.releaseDate,
    track.coverPath,
    track.createdAt,
    track.albumId,
    track.trackNumber,
    JSON.stringify(track.artistIds)
  )
  return track
}

export const deleteTrack = (id: string): void => {
  const db = getDb()
  db.prepare('DELETE FROM tracks WHERE id = ?').run(id)
}
