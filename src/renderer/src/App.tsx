import { useNavigationStore } from './stores/navigationStore'
import Add from './pages/Add'
import Home from './pages/Home'
import AddButton from './components/AddButton'
function App(): React.JSX.Element {
  const page = useNavigationStore((s) => s.page)
  return (
    <>
      {page === 'home' && <Home />}
      {page === 'add' && <Add />}
      <AddButton />
    </>
  )
}
export default App
