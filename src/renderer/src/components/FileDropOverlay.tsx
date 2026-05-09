// Implements drag and drop file path uploading

import { useApi } from '@renderer/api'
import AddButton from './AddButton'
import FileDropModal from './FileDropModal'
import { FolderUp } from 'lucide-react'
import { useState } from 'react'
import { useFileTreeInput } from '@renderer/stores/fileInputStore'
import { FileTreeNode } from '@lib/FileTreeNode'
enum DropState {
  CLOSED,
  WAITING,
  PROCESSING,
  COMPLETE
}
const FileDropOverlay = (): React.JSX.Element => {
  const api = useApi()
  const { fileTree, setFileTree } = useFileTreeInput()

  const [dropState, setDropState] = useState<DropState>(DropState.CLOSED)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    setDropState(DropState.PROCESSING)
    e.preventDefault()
    const paths = Array.from(e.dataTransfer.files).map((f: File) => api.getPathForFile(f))
    const res = await api.intakeFilePaths(paths)
    const fileInputs = FileTreeNode.fromJSON(res)
    setFileTree(fileInputs)

    setDropState(DropState.COMPLETE)
  }

  // handle the button click to toggle the modal on and off
  const handleToggle = (): void => {
    if (dropState == DropState.CLOSED) {
      setDropState(DropState.WAITING)
    } else {
      setDropState(DropState.CLOSED)
    }
  }

  return (
    <div className="fixed w-full h-full z-0">
      {dropState != DropState.CLOSED && (
        <FileDropModal>
          {dropState == DropState.WAITING && (
            <div onDrop={handleDrop} onDragOver={handleDragOver}>
              <div className="flex flex-col items-center gap-2">
                <FolderUp size={60} />
                <p>Drag and Drop Files to Upload</p>
              </div>
            </div>
          )}
          {dropState == DropState.PROCESSING && <p>Processing Files...</p>}
          {dropState == DropState.COMPLETE && fileTree && FileTreeNode.toReactNode(fileTree)}
        </FileDropModal>
      )}
      <div className="absolute z-20 right-8 bottom-8">
        <AddButton onClick={handleToggle} />
      </div>
    </div>
  )
}

export default FileDropOverlay
