import Database from 'better-sqlite3'

export const schema = {
  artists: `
    CREATE TABLE IF NOT EXISTS artists (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      website TEXT,
      album_ids TEXT NOT NULL,
      track_ids TEXT NOT NULL
)
`,
  albums: `
    CREATE TABLE IF NOT EXISTS albums (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      releasenumber TEXT,
      folder_path TEXT NOT NULL,
      cover_path TEXT,
      created_at INTEGER NOT NULL,
      track_ids TEXT NOT NULL,
      artist_ids TEXT NOT NULL
)
`,
  tracks: `
    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      path TEXT NOT NULL,
      title TEXT NOT NULL,
      duration INTEGER NOT NULL,
      sample_rate INTEGER NOT NULL,
      track_number INTEGER,
      release_date INTEGER NOT NULL,
      cover_path TEXT,
      created_at INTEGER NOT NULL,
      album_id TEXT REFERENCES albums(id) ON DELETE CASCADE,
      artist_ids TEXT NOT NULL
)
`,
  playlists: `
  CREATE TABLE IF NOT EXISTS playlists (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    track_ids TEXT NOT NULL
  )
`
}

export const initSchema = (db: Database.Database): void => {
  Object.values(schema).forEach((sql) => db.exec(sql))
}
