import { FileTreeNode } from '@lib/FileTreeNode'

type State =
  | { status: 'waiting' }
  | { status: 'processing' }
  | { status: 'processed'; fileTree: FileTreeNode }
  | { status: 'complete' }

type Action =
  | { type: 'OPEN' }
  | { type: 'DROP' }
  | { type: 'PROCESSED'; fileTree: FileTreeNode }
  | { type: 'COMPLETE' }

export const fileDropReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN':
      return { status: 'waiting' }
    case 'DROP':
      return { status: 'processing' }
    case 'PROCESSED':
      return { status: 'processed', fileTree: action.fileTree }
    case 'COMPLETE':
      if (state.status !== 'processed') return state
      return { status: 'complete' }
    default:
      return state
  }
}
