import { useEffect, useRef, useState } from 'react'
import './app.css'
import SliderBox from './components/ThumbnailAccordin'
import Chatbox from './components/ChatBox'
import BaseChatBox from './components/BaseChatBox'
import ChatBox from './components/PlatformChat/ChatBox'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import LandingPage from './pages/LandingPage'
import ImageCrop from './components/ImageCrop'
import ScreenLearning from './pages/ScreenLearning'
import CarasoulPage from './pages/CarasoulPage'
import Magnifier from './pages/Magnifier'
import SidebarPage from './pages/SidebarPage'
import ChatPage from './pages/ChatPage'
import styled from 'styled-components';
import ThemeToggle from './components/sidebar/ThemeToggle'
import { ImageFileHandler } from './components/forms/fileHandler/ImageFileHandler'
import FileUploadPage from './pages/file/FileUploadPage'
import TicketPrinter from './components/ticket_printer/TicketPrinter'


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
   <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200'>
   <header className='nav_bar sticky top-0 w-full z-50 transition-all duration-300 bg-white dark:bg-gray-700 shadow-md py-0'>
   <div className='flex p-3 place-content-center justify-between'>
        <h1 className='text-2xl font-bold text-slate-700 dark:text-slate-200'>
          <Link to={"/"}>Anil Components</Link>
        </h1>
        <ThemeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
        </div>
   </header>
   <main className='flex-grow mt-1'>
    <Routes>
    <Route path='' element={<LandingPage/>} />
    <Route path='/chat' element={<ChatBox/>}/>
    <Route path='/chat-ui' element={<ChatPage/>}/>
    <Route path='/cropper' element={<ImageCrop/>}/>
    <Route path='/screen-learning' element={<ScreenLearning/>}/>
    <Route path='/slider' element={<CarasoulPage/>}/>
    <Route path='/magnifier' element={<Magnifier/>}/>
    <Route path='/sidebar' element={<SidebarPage/>} />
    <Route path='/filehandler' element={<FileUploadPage/>} />
    <Route path='/ticket-printer' element={<TicketPrinter/>} />
   </Routes>
   </main>
    </div>

   </BrowserRouter>

    </>
  )
}


export default App
