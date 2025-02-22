import React from 'react'
import { Link } from 'react-router';
import styled from 'styled-components';
import ImageMagnifier from './ImageMagnifier';

const LandingPage:React.FC = () => {
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
      const liStyle:string = 'bg-slate-400 p-2'
  return (
    
    <AppContainer>
        <Header>
        <h1>Anil Wagle React Components</h1>
        </Header>

        <div className="component_list p-10">
            <ul className='grid grid-cols-3 gap-2'>
                <li className='bg-slate-200 p-2 min-h-20'><Link to={'/chat'}>Chat App with Django Websocket API</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/cropper'}>Image Cropper</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/accordin'}>Krishna Accordin</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/screen-learning'}>Screen Learning</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/slider'}>Custom Slick Carasoul</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/magnifier'}>New Magnifier</Link></li>
            </ul>
        </div>

        {/* <ImageMagnifier imageSrc='https://picsum.photos/500/' zoomLevel={2}/> */}
    </AppContainer>
  )
}

export default LandingPage