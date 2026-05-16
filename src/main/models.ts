import Database from 'better-sqlite3'

export const schema = {
  artists: `
    CREATE TABLE IF NOT EXISTS artists {
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      website TEXT
    }
`,
  albums: `
    CREATE TABLE IF NOT EXISTS albums {
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      folder_path TEXT NOT NULL,
      cover_path TEXT,
      created_at INTEGER NOT NULL
    }
`,
  tracks: `
    CREATE TABLE IF NOT EXISTS tracks {
      id TEXT PRIMARY KEY,
      path TEXT NOT NULL,
      title TEXT NOT NULL,
      duration INTEGER NOT NULL,
      sample_rate INTEGER NOT NULL,
      release_date INTEGER NOT NULL,
      cover_path TEXT,
      created_at INTEGER NOT NULL
    }
`,
  albumArtists: `
    CREATE TABLE IF NOT EXISTS album_artists {
      album_id TEXT REFERENCES albums(id),
      artist_id TEXT REFERENCES artists(id),
      PRIMARY KEY (album_id, artist_id)
    }
`,
  trackArtists: `
    CREATE TABLE IF NOT EXISTS track_artists {
      track_id TEXT REFERENCES tracks(id),
      artist_id TEXT REFERENCES artists(id),
      PRIMARY KEY (track_id, artist_id)
    }
`
}

export const initSchema = (db: Database.Database): void => {
  Object.values(schema).forEach((sql) => db.exec(sql))
}
