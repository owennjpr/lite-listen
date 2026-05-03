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
}
