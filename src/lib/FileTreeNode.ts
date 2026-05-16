import { FileKinds } from './types'
export class FileTreeNode {
  name: string
  format: string | null
  kind: FileKinds
  children: FileTreeNode[]
  path?: string

  constructor(
    name: string,
    kind: FileKinds,
    format: string | null = null,
    children: FileTreeNode[] = [],
    path?: string
  ) {
    this.name = name
    this.kind = kind
    this.format = format
    this.children = children
    if (path) this.path = path
  }

  static print(tree: FileTreeNode, indent?: number): void {
    const ind = indent ?? 0
    let prefix = ''
    for (let i = 0; i < ind; i++) {
      prefix += '  '
    }
    console.log(
      `${prefix}file: ${tree.name}${tree.format}, kind: ${tree.kind}, path: ${tree.path ?? ''}`
    )
    for (const child of tree.children) {
      FileTreeNode.print(child, ind + 1)
    }
  }
  static fromJSON(json: unknown): FileTreeNode {
    const node = json as {
      name: string
      kind: string
      format: string
      children?: unknown[]
      path?: string
    }
    return new FileTreeNode(
      node.name,
      +node.kind as FileKinds,
      node.format,
      (node.children ?? []).map(FileTreeNode.fromJSON),
      node.path
    )
  }

  static cleanPaths(tree: FileTreeNode): FileTreeNode {
    if (tree.path) delete tree.path
    tree.children = tree.children.map(FileTreeNode.cleanPaths)
    return tree
  }
}
