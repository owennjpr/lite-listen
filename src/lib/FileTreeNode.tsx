import { ReactNode } from 'react'
import { FileKinds } from './types'
import { File, Image, Folder, AudioLines } from 'lucide-react'
export class FileTreeNode {
  name: string
  format: string | null
  kind: FileKinds
  children: FileTreeNode[]

  constructor(
    name: string,
    kind: FileKinds,
    format: string | null = null,
    children: FileTreeNode[] = []
  ) {
    this.name = name
    this.kind = kind
    this.format = format
    this.children = children
  }

  static fromJSON(json: unknown): FileTreeNode {
    const node = json as { name: string; kind: string; format: string; children?: unknown[] }
    console.log(`kind: ${node.kind} format: ${node.format}`)
    return new FileTreeNode(
      node.name,
      node.kind as FileKinds,
      node.format,
      (node.children ?? []).map(FileTreeNode.fromJSON)
    )
  }
  static kindToIcon(tree: FileTreeNode): ReactNode {
    switch (tree.kind) {
      case FileKinds.AUDIO:
        return <AudioLines size={16} />
      case FileKinds.IMAGE:
        return <Image size={16} />
      case FileKinds.DIRECTORY:
        return <Folder size={16} />
      case FileKinds.OTHER:
        return <File size={16} />
    }
  }
  static toReactNode(tree: FileTreeNode): ReactNode {
    const icon: ReactNode = FileTreeNode.kindToIcon(tree)

    return (
      <div key={tree.name + tree.format} className="flex flex-col items-start gap-1">
        <div className="flex gap-2 items-center">
          {icon}
          <p>
            <span className="font-bold test-sm">{tree.name}</span>
            <span className="text-gray-400">{tree.format}</span>
          </p>
        </div>
        <div className="" style={{ marginLeft: '8px' }}>
          {tree.children.map(FileTreeNode.toReactNode)}
        </div>
      </div>
    )
  }
}
