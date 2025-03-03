import { useEffect, useRef, useState } from 'react'
import './app.css'
import SliderBox from './components/ThumbnailAccordin'
import Chatbox from './components/ChatBox'
import BaseChatBox from './components/BaseChatBox'
import ChatBox from './components/PlatformChat/ChatBox'
import { BrowserRouter, Route, Routes } from 'react-router'
import LandingPage from './pages/LandingPage'
import ImageCrop from './components/ImageCrop'
import ScreenLearning from './pages/ScreenLearning'
import CarasoulPage from './pages/CarasoulPage'
import Magnifier from './pages/Magnifier'
import SidebarPage from './pages/SidebarPage'
import ChatPage from './pages/ChatPage'
import styled from 'styled-components';

function App() {
  const Header = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  `;
  const AppContainer = styled.div`
  // text-align: center;
`;
  return (
    <>
   <BrowserRouter>
   <AppContainer>
        <Header>
        <h1>Anil Wagle React Components</h1>
        </Header>
        <Routes>
    <Route path='' element={<LandingPage/>} />
    <Route path='/chat' element={<ChatBox/>}/>
    <Route path='/chat-ui' element={<ChatPage/>}/>
    <Route path='/cropper' element={<ImageCrop/>}/>
    <Route path='/screen-learning' element={<ScreenLearning/>}/>
    <Route path='/slider' element={<CarasoulPage/>}/>
    <Route path='/magnifier' element={<Magnifier/>}/>
    <Route path='/sidebar' element={<SidebarPage/>} />
   </Routes>
    </AppContainer>
   </BrowserRouter>

    </>
  )
}


export default App
