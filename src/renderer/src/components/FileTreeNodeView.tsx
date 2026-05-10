import { FileTreeNode } from '@lib/FileTreeNode'
import { FileKinds } from '@lib/types'
import { File, Image, Folder, AudioLines } from 'lucide-react'
import { ReactNode } from 'react'
interface FileTreeNodeViewProps {
  tree: FileTreeNode
}
const kindToIcon = (tree: FileTreeNode): ReactNode => {
  switch (tree.kind) {
    case FileKinds.AUDIO:
      return <AudioLines size={12} />
    case FileKinds.IMAGE:
      return <Image size={12} />
    case FileKinds.DIRECTORY:
      return <Folder size={12} />
    case FileKinds.OTHER:
      return <File size={12} />
  }
}

const FileTreeNodeView = (props: FileTreeNodeViewProps): ReactNode => {
  const { tree } = props
  const icon = kindToIcon(tree)
  return (
    <div key={tree.name + tree.format} className="flex flex-col items-start">
      <div
        className={`flex gap-2 items-center ${tree.kind == FileKinds.OTHER ? 'opacity-30' : ''}`}
      >
        {icon}
        <p>
          <span className="font-bold text-xs">{tree.name}</span>
          <span className="text-gray-600 text-xs">{tree.format}</span>
        </p>
      </div>
      <div className="" style={{ marginLeft: '16px' }}>
        {tree.children
          .sort((a, b) => a.kind - b.kind)
          .map((c, i) => (
            <FileTreeNodeView tree={c} key={i} />
          ))}
      </div>
    </div>
  )
}

export default FileTreeNodeView
