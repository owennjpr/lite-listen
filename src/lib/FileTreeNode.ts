import { FileKinds } from './types'
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
      +node.kind as FileKinds,
      node.format,
      (node.children ?? []).map(FileTreeNode.fromJSON)
    )
  }
}
