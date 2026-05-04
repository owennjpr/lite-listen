import { useApi } from '@renderer/api'
const DevButtons = (): React.JSX.Element => {
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
    <div>
      <button className="bg-green-400" onClick={handlePing}>
        ping
      </button>
      <button className="bg-blue-300" onClick={handleMkdir}>
        mkdir
      </button>
    </div>
  )
}

export default DevButtons
