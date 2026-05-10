// Implements drag and drop file path uploading

import { useApi } from '@renderer/api'
import AddButton from './AddButton'
import FileDropModal from './FileDropModal'
import { FolderUp } from 'lucide-react'
import { useReducer, useState } from 'react'
import { FileTreeNode } from '@lib/FileTreeNode'
import { fileDropReducer } from './FileDropReducer'
import FileTreeNodeView from './FileTreeNodeView'

const FileDropOverlay = (): React.JSX.Element => {
  const api = useApi()
  const [state, dispatch] = useReducer(fileDropReducer, { status: 'closed' })
  const [indexed, setIndexed] = useState<boolean>(false)
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault()
    dispatch({ type: 'DROP' })
    const paths = Array.from(e.dataTransfer.files).map((f: File) => api.getPathForFile(f))
    const res = await api.intakeFilePaths(paths)
    dispatch({ type: 'PROCESSED', fileTree: FileTreeNode.fromJSON(res) })
  }

  const handleComplete = async (): Promise<void> => {
    if (state.status !== 'processed') return
    const success = await api.indexFileTree(state.fileTree)
    setIndexed(success)
    dispatch({ type: 'COMPLETE' })
  }

  // handle the button click to toggle the modal on and off
  const handleToggle = (): void => {
    if (state.status !== 'closed') api.clearFileTree()
    dispatch({ type: state.status == 'closed' ? 'OPEN' : 'CLOSE' })
  }

  return (
    <div className="fixed w-full h-full z-0">
      {state.status !== 'closed' && (
        <FileDropModal>
          {state.status === 'waiting' && (
            <div onDrop={handleDrop} onDragOver={handleDragOver}>
              <div className="flex flex-col items-center gap-2">
                <FolderUp size={60} />
                <p>Drag and Drop Files to Upload</p>
              </div>
            </div>
          )}
          {state.status === 'processing' && <p>Processing Files...</p>}
          {state.status === 'processed' && (
            <div className="overflow-scroll">
              <FileTreeNodeView tree={state.fileTree} />
              <button onClick={handleComplete} className="cursor-pointer bg-red-300">
                submit
              </button>
            </div>
          )}
          {state.status === 'complete' && <div>{indexed ? 'complete' : 'an error occurred'}</div>}
        </FileDropModal>
      )}
      <div className="absolute z-20 right-8 bottom-8">
        <AddButton onClick={handleToggle} />
      </div>
    </div>
  )
}

export default FileDropOverlay
