import { create } from 'zustand'

type Page = 'home' | 'add'

type NativationStore = {
  page: Page
  navigate: (page: Page) => void
}

export const useNavigationStore = create<NativationStore>((set) => ({
  page: 'home',
  navigate: (page) => set({ page })
}))
