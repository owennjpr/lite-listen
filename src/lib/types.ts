// Audio formats
export const AUDIO_FORMATS = ['wav', 'flac', 'aiff', 'aif', 'mp3', 'm4a'] as const
export type AudioFormat = (typeof AUDIO_FORMATS)[number]

// Image formats
export const IMAGE_FORMATS = ['png', 'jpg', 'jpeg'] as const
export type ImageFormat = (typeof IMAGE_FORMATS)[number]

export enum FileKinds {
  AUDIO = 'audio',
  IMAGE = 'image',
  DIRECTORY = 'directory',
  OTHER = 'other'
}
