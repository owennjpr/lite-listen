import { useApi } from '@renderer/api'
import { useNavigationStore } from '@renderer/stores/navigationStore'
import { Plus } from 'lucide-react'

const AddButton = (): React.JSX.Element => {
  const { page, navigate } = useNavigationStore()
  const api = useApi()

  const onClick = (): void => {
    navigate(page == 'add' ? 'home' : 'add')
    api.clearFileTree()
  }
  return (
    <div className="absolute z-20 right-8 bottom-8">
      <button onClick={onClick} className="ElevatedContainer rounded-full cursor-pointer z-20">
        <Plus />
      </button>
    </div>
  )
}

export default AddButton
