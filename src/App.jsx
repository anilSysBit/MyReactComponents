import { useEffect, useRef, useState } from 'react'
// import "./styles/index.css"
import './app.css'
import SliderBox from './components/ThumbnailAccordin'
import Chatbox from './components/ChatBox'
import BaseChatBox from './components/BaseChatBox'
import { Buffer } from 'buffer'
// import ImageCrop from './components/ImageCrop'


import styled from 'styled-components';
import ChatBox from './components/PlatformChat/ChatBox'
import { BrowserRouter, Route, Routes } from 'react-router'
import LandingPage from './pages/LandingPage'
import ImageCrop from './components/ImageCrop'
import ScreenLearning from './pages/ScreenLearning'
import CarasoulPage from './pages/CarasoulPage'

function App() {
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path='' element={<LandingPage/>} />
    <Route path='/chat' element={<ChatBox/>}/>
    <Route path='/cropper' element={<ImageCrop/>}/>
    <Route path='/screen-learning' element={<ScreenLearning/>}/>
    <Route path='/slider' element={<CarasoulPage/>}/>
   </Routes>
   </BrowserRouter>

    </>
  )
}

export default App
