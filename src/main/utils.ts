import { AUDIO_FORMATS, AudioFormat, FileKinds, IMAGE_FORMATS, ImageFormat } from '../lib/types'

export const isAudioFile = (ext: string | null): boolean => {
  return AUDIO_FORMATS.includes(ext as AudioFormat)
}

export const isImageFile = (ext: string | null): boolean => {
  return IMAGE_FORMATS.includes(ext as ImageFormat)
}

export const ParseFileKind = (
  path: string
): { name: string; kind: FileKinds; ext: string | null } => {
  const fileName = path.split('/').at(-1) ?? ''
  const nameOnly = fileName.split('.')[0]

  const dotIndex = fileName.lastIndexOf('.')
  const ext = dotIndex === -1 ? null : fileName.slice(dotIndex).toLowerCase()

  let kind = FileKinds.OTHER
  if (!ext) {
    kind = FileKinds.DIRECTORY
  } else if (isAudioFile(ext)) {
    kind = FileKinds.AUDIO
  } else if (isImageFile(ext)) {
    kind = FileKinds.IMAGE
  }
  return { name: nameOnly, kind: kind, ext: ext }
}
