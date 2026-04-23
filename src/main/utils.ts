import { AUDIO_FORMATS, AudioFormat, FileKinds, IMAGE_FORMATS, ImageFormat } from '../lib/types'

export const isAudioFile = (ext: string): boolean => {
  return AUDIO_FORMATS.includes(ext as AudioFormat)
}

export const isImageFile = (ext: string): boolean => {
  return IMAGE_FORMATS.includes(ext as ImageFormat)
}

export const ParseFileKind = (path: string): { kind: FileKinds; ext: string } => {
  const ext = path.split('.').at(-1)?.toLowerCase() ?? ''

  if (isAudioFile(ext)) {
    return { kind: FileKinds.AUDIO, ext: ext }
  } else if (isImageFile(ext)) {
    return { kind: FileKinds.IMAGE, ext: ext }
  } else {
    return { kind: FileKinds.OTHER, ext: ext }
  }
}
