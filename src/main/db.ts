import Database from 'better-sqlite3'
import { app } from 'electron'
import { initSchema } from './models'

let db: Database.Database

export const getDb = (): Database.Database => {
  if (!db) {
    const prefix = app.getPath('userData')
    db = new Database(prefix + 'library.db')
    db.pragma('journalMode = WAL')
    db.pragma('foreign_keys = ON')
    initSchema(db)
  }

  return db
}

export const closeDb = (): void => {
  db?.close()
}
