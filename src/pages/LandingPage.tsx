import React from 'react'
import { Link } from 'react-router';
import MotionDiv from '../components/utility/MotionDiv';

const LandingPage:React.FC = () => {
    const items = [
        { path: '/chat', title: 'Chat App with Django Websocket API' },
        { path: '/chat-ui', title: 'Chat App UI' },
        { path: '/cropper', title: 'Image Cropper' },
        { path: '/accordin', title: 'Krishna Accordin' },
        { path: '/screen-learning', title: 'Screen Learning' },
        { path: '/slider', title: 'Custom Slick Carousel' },
        { path: '/magnifier', title: 'New Magnifier' },
        { path: '/sidebar', title: 'Admin Sidebar' }
      ];
  return (
    

<MotionDiv>
  <div className="component_list p-10">
    <ul className="grid grid-cols-3 gap-2">
      {items.map((item, index) => (
        <li key={index} className="bg-slate-200 dark:bg-slate-700 p-4 min-h-20 rounded-lg shadow-md">
          <Link className="text-slate-700 dark:text-slate-200" to={item.path}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</MotionDiv>
  )
}

export default LandingPage