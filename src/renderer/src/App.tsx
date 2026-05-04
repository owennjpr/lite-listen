import DevButtons from './components/DevButtons'
import FileDropOverlay from './components/FileDropOverlay'
function App(): React.JSX.Element {
  return (
    <div className="relative w-full h-full">
      <DevButtons />
      <FileDropOverlay />
    </div>
  )
}
export default App
