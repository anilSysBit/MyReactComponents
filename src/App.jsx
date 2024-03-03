import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import KrishnaAccordin from './components/KrishnaAccordin'
// import CustomPaging from './components/ThumbnailAccordin'
import "./styles/index.css"
import SliderBox from './components/ThumbnailAccordin'
import ThumbnailAccordin from './components/ThumbnailAccordin'
import PopImageGallery from './components/PopopImageGallery'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <KrishnaAccordin/> */}
      {/* <ThumbnailAccordin /> */}
      <PopImageGallery/>
    </>
  )
}

export default App
