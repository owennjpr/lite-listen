import { ipcMain } from 'electron'
import { mkdir, intakeFilePaths, indexFileTree, clearFileTree } from './domain/filesystem'
import { createTrack, deleteTrackByID, getAllTracks, getTrackByID } from './api/track'
import { Track, TrackFilters } from '../lib/schemas'
export const registerIpcHandlers = (): void => {
  //TEST ONLY
  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('mkdir', (_event, path: string) => mkdir(path))

  //FILE IMPORTING
  ipcMain.handle('intakeFilePaths', (_event, paths: string[]) => intakeFilePaths(paths))
  ipcMain.handle('clearFileTree', () => clearFileTree())
  ipcMain.handle('indexFileTree', () => indexFileTree())

  //TRACK CRUD
  ipcMain.handle('createTrack', (_event, data: Omit<Track, 'id' | 'createdAt'>) =>
    createTrack(data)
  )
  ipcMain.handle('getTrackByID', (_event, id: string) => getTrackByID(id))
  ipcMain.handle('getAllTracks', (_event, filters: TrackFilters) => getAllTracks(filters))
  ipcMain.handle('deleteTrackByID', (_event, id: string) => deleteTrackByID(id))
}
