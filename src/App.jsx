import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import KrishnaAccordin from './components/KrishnaAccordin'
// import CustomPaging from './components/ThumbnailAccordin'
import "./styles/index.css"
import SliderBox from './components/ThumbnailAccordin'
import ThumbnailAccordin from './components/ThumbnailAccordin'
import PopGallery from './components/PopGallery'
import Chatbox from './components/ChatBox'
import BaseChatBox from './components/BaseChatBox'
// import PopImageGallery from './components/PopopImageGallery'


function App() {
  const [count, setCount] = useState(0)
  const popRef = useRef();

  return (
    <>
      {/* <KrishnaAccordin/> */}
      {/* <Chatbox/> */}
      <BaseChatBox/>
    </>
  )
}

export default App
