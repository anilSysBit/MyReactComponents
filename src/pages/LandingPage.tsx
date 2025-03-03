import React from 'react'
import { Link } from 'react-router';
import MotionDiv from '../components/utility/MotionDiv';

const LandingPage:React.FC = () => {

  return (
    

        <MotionDiv>
            <div className="component_list p-10">
            <ul className='grid grid-cols-3 gap-2'>
                <li className='bg-slate-200 p-2 min-h-20'><Link to={'/chat'}>Chat App with Django Websocket API</Link></li>
                <li className='bg-slate-200 p-2 min-h-20'><Link to={'/chat-ui'}>Chat App UI</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/cropper'}>Image Cropper</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/accordin'}>Krishna Accordin</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/screen-learning'}>Screen Learning</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/slider'}>Custom Slick Carasoul</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/magnifier'}>New Magnifier</Link></li>
                <li className='bg-slate-200 p-2'><Link to={'/sidebar'}>Admin Sidebar</Link></li>
            </ul>
        </div>
        </MotionDiv>
  )
}

export default LandingPage