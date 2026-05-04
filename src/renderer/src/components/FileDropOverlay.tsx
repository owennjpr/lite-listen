// Implements drag and drop file path uploading

import { useApi } from '@renderer/api'
import AddButton from './AddButton'
import FileDropModal from './FileDropModal'
import { FolderUp } from 'lucide-react'
import { useState } from 'react'

const FileDropOverlay = (): React.JSX.Element => {
  const api = useApi()

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault()
    const paths = Array.from(e.dataTransfer.files).map((f: File) => api.getPathForFile(f))
    const FileTree = await api.intakeFilePaths(paths)
    console.log(FileTree)
  }
  return (
    <div className="fixed w-full h-full z-0">
      {modalVisible && (
        <FileDropModal>
          <div onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="flex flex-col items-center gap-2">
              <FolderUp size={60} />
              <p>Drag and Drop Files to Upload</p>
            </div>
          </div>
        </FileDropModal>
      )}
      <div className="absolute z-20 right-8 bottom-8">
        <AddButton onClick={(): void => setModalVisible(!modalVisible)} />
      </div>
    </div>
  )
}

export default FileDropOverlay
