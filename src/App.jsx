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
import ThemeToggle from './components/sidebar/ThemeToggle'

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

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check the current theme from localStorage or default to system preference
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else if (darkMode === 'disabled') {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      }
    }
  }, []);

// Toggle dark mode and store the state in localStorage
const toggleDarkMode = () => {
  if (isDarkMode) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'disabled');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
  }
  setIsDarkMode(!isDarkMode);
};

  return (
    <>
   <BrowserRouter>
   <AppContainer>

        <div className='flex p-2 place-content-center gap-10 bg-slate-200 dark:bg-slate-700'>
        <h1 className='text-2xl font-bold text-slate-700 dark:text-slate-200'>Anil Wagle React Components</h1>
        <ThemeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
        </div>
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
