import { useApi } from '@renderer/api'
import { FolderUp } from 'lucide-react'
import { useReducer, useState } from 'react'
import { FileTreeNode } from '@lib/FileTreeNode'
import { fileDropReducer } from '../components/FileDropReducer'
import FileTreeNodeView from '../components/FileTreeNodeView'

const Add = (): React.JSX.Element => {
  const api = useApi()
  const [state, dispatch] = useReducer(fileDropReducer, { status: 'waiting' })
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

  return (
    <div className="grid grid-cols-[2fr_1fr] w-full h-full">
      <div className="w-full h-full overflow-y-scroll overflow-x-clip min-h-0">
        {state.status === 'waiting' && (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <FolderUp size={60} />
            <p>Drag and Drop Files to Upload</p>
          </div>
        )}
        {state.status === 'processing' && <p>Processing Files...</p>}
        {state.status === 'processed' && <FileTreeNodeView tree={state.fileTree} />}
      </div>
      <div className="border-l w-full h-full flex justify-center items-center">
        {state.status === 'processed' && (
          <button onClick={handleComplete} className="cursor-pointer">
            SUBMIT
          </button>
        )}

        {state.status === 'complete' && <div>{indexed ? 'COMPLETE' : 'AN ERROR OCCURRED'}</div>}
      </div>
    </div>
  )
}

export default Add
