import { useApi } from '@renderer/api'
import { useState } from 'react'
const DevButtons = (): React.JSX.Element => {
  const api = useApi()
  const [output, setOutput] = useState<string>('no output yet')
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

  const handleGetTracks = (): void => {
    const tracks = api.getAllTracks({})
    console.log(tracks)
    setOutput(tracks.toString)
  }

  const handleSubmitExampleTrack = (event): void => {
    event.preventDefault()
    const title = event.target.title.value
    const track = api.createTrack({
      title: title,
      path: '/',
      duration: 90,
      sampleRate: 500,
      releaseDate: '06/07/2026',
      coverPath: null,
      albumId: null,
      trackNumber: 1,
      artistIds: []
    })
    console.log(track)
    setOutput(track.toString())
  }
  return (
    <div className="flex flex-col">
      <div className="flex">
        <button className="bg-green-400" onClick={handlePing}>
          ping
        </button>
        <button className="bg-blue-300" onClick={handleMkdir}>
          mkdir
        </button>
        <button className="bg-amber-400" onClick={handleGetTracks}>
          get tracks
        </button>
      </div>
      <form onSubmit={handleSubmitExampleTrack}>
        <input
          className="bg-red-200"
          type="text"
          id="title"
          name="title"
          placeholder="example track"
        />
        <input className="bg-emerald-200" type="submit"></input>
      </form>
      <div>{output}</div>
    </div>
  )
}

export default DevButtons
