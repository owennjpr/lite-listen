import { Plus } from 'lucide-react'
interface AddButtonProps {
  onClick: () => void
}
const AddButton = (props: AddButtonProps): React.JSX.Element => {
  const { onClick } = props
  return (
    <button onClick={onClick} className="ElevatedContainer rounded-full cursor-pointer z-20">
      <Plus />
    </button>
  )
}

export default AddButton
