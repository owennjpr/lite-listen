import { useApi } from './api'
import FileDrop from './components/FileDrop'
function App(): React.JSX.Element {
  const api = useApi()
  const handlePing = async (): Promise<void> => {
    const res = await api.ping()
    console.log(res)
    return
  }
  const handleMkdir = async (): Promise<void> => {
    const res = await api.mkdir('')
    console.log(res)
    return
  }

  return (
    <div className="flex gap-2">
      <button className="bg-green-400 p-2 rounded-2xl" onClick={handlePing}>
        ping
      </button>
      <button className="bg-blue-300 p-2 rounded-2xl" onClick={handleMkdir}>
        mkdir
      </button>
      <FileDrop />
    </div>
  )
}
export default App
