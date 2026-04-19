// Implements drag and drop file path uploading

import { useApi } from '@renderer/api'

const FileDrop = (): React.JSX.Element => {
  const api = useApi()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    const paths = Array.from(e.dataTransfer.files).map((f: File) => api.getPathForFile(f))
    api.intakeFilePaths(paths)
  }
  return (
    <div
      className="w-32 h-20 border-2 border-black rounded-2xl"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      drag and drop
    </div>
  )
}

export default FileDrop
