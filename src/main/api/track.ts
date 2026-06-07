import { Track, TrackFilters } from '../../lib/schemas'
import { deleteTrack, getTracks, insertTrack } from '../crud/track'

export const createTrack = (data: Omit<Track, 'id' | 'createdAt'>): Track => {
  const track: Track = insertTrack(data)

  //TODO: update related entities
  return track
}

export const getTrackByID = (id: string): Track => {
  const track: Track[] = getTracks({ id: id })
  if (track.length == 0) {
    new Error('No track found with ID')
  } else if (track.length > 1) {
    new Error('Duplicate track IDs detected')
  }

  return track[0]
}

export const getAllTracks = (filters: TrackFilters): Track[] => {
  return getTracks(filters)
}

export const deleteTrackByID = (id: string): void => {
  deleteTrack(id)
}
