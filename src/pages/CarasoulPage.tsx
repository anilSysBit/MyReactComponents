import React, { useState } from 'react';
import AnilCarasoul from '../components/carasoul/AnilCarasoul';
// import CarasoulProps from '../components/carasoul/carasoulType';
import { CarasoulProps } from '../components/carasoul/carasoulType';
import ProjectCard from '../cards/ProjectCard';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const CarasoulPage = () => {
    const [settings, setSettings] = useState<CarasoulProps>({
        itemsToShow: 3,
        itemToScroll: 2,
        arrows: true,
        dots: true,
        infinite:true,
        autoPlay:false,
        scrollDuration:800,

    });
    var settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
      };
    const [infi,setInfi] = useState(false);
    const projects = [
        {
          title: 'Jagatpur E-Bazar',
          description: 'A real e-commerce website for selling projects with an interactive user site, admin panel, and seller panel.',
          image: 'https://picsum.photos/400/300?random=1',
          tags: ['React.js', 'Admin Panel', 'Seller Panel', 'User Website'],
          liveUrl: 'https://next-jeb.vercel.app/',
          githubUrl: 'https://github.com/anilSysBit',
        },
        {
          title: 'Football Management System',
          description: 'A project for managing football events, teams, and users with a robust backend.',
          image: 'https://picsum.photos/400/300?random=2',
          tags: ['Django', 'React.js', 'REST API'],
          liveUrl: 'https://gpn-sports.vercel.app/',
          githubUrl: 'https://github.com/anilSysBit',
        },
        {
          title: 'Jagatpur Blood Management System',
          description: 'A website for managing blood delivery, handling blood requests, and user management.',
          image: 'https://picsum.photos/400/300?random=3',
          tags: ['React.js', 'Admin Panel'],
          liveUrl: 'bms.jagatpurebazar.com',
          githubUrl: 'https://github.com/anilSysBit',
        },
        {
          title: 'Meal Planner',
          description: 'A website that recommends personalized meals based on BMI, user preferences, and daily routines.',
          image: 'https://picsum.photos/400/300?random=4',
          tags: ['Django', 'Full Stack', 'Meal Planning'],
          liveUrl: 'http://localhost:8000/',
          githubUrl: 'https://github.com/anilSysBit',
        },
        {
          title: 'Laravel Blood Management Project',
          description: 'A website for handling blood delivery data with Laravel for backend and user management.',
          image: 'https://picsum.photos/400/300?random=5',
          tags: ['Laravel', 'Backend', 'Blood Management'],
          liveUrl: 'http://localhost:5173',
          githubUrl: 'https://github.com/anilSysBit',
        },
        {
          title: 'Pinterest Clone',
          description: 'A Pinterest-like clone with React.js featuring image sharing and user interactions.',
          image: 'https://picsum.photos/400/300?random=6',
          tags: ['React.js', 'UI/UX'],
          liveUrl: 'https://pinterestwebx.vercel.app/',
          githubUrl: 'https://github.com',
        },
        // {
        //     title: 'Povertect Clone',
        //     description: 'A Pinterest-like clone with React.js featuring image sharing and user interactions.',
        //     image: 'https://picsum.photos/400/300?random=7',
        //     tags: ['React.js', 'UI/UX'],
        //     liveUrl: 'https://pinterestwebx.vercel.app/',
        //     githubUrl: 'https://github.com',
        //   },
        //   {
        //     title: 'Obertact Planner',
        //     description: 'A website that recommends personalized meals based on BMI, user preferences, and daily routines.',
        //     image: 'https://picsum.photos/400/300?random=8',
        //     tags: ['Django', 'Full Stack', 'Meal Planning'],
        //     liveUrl: 'http://localhost:8000/',
        //     githubUrl: 'https://github.com/anilSysBit',
        //   },
        //   {
        //     title: 'Hawa Planner',
        //     description: 'A website that recommends personalized meals based on BMI, user preferences, and daily routines.',
        //     image: 'https://picsum.photos/400/300?random=4',
        //     tags: ['Django', 'Full Stack', 'Meal Planning'],
        //     liveUrl: 'http://localhost:8000/',
        //     githubUrl: 'https://github.com/anilSysBit',
        //   },
        //   {
        //     title: 'Hawa dinner',
        //     description: 'A website for handling blood delivery data with Laravel for backend and user management.',
        //     image: 'https://picsum.photos/400/300?random=5',
        //     tags: ['Laravel', 'Backend', 'Blood Management'],
        //     liveUrl: 'http://localhost:5173',
        //     githubUrl: 'https://github.com/anilSysBit',
        //   },
      ];
      
    return (
        <div>
            {/* User Controls */}
            <div className="p-4 bg-gray-100 rounded-md shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-2">Carousel Settings</h2>
                <label className="block mb-2">
                    Items to Show:
                    <input 
                        type="number" 
                        value={settings.itemsToShow} 
                        onChange={(e) => setSettings({ ...settings, itemsToShow: Number(e.target.value) })} 
                        className="ml-2 p-1 border rounded"
                        min={1}
                    />
                </label>

                <label className="block mb-2">
                    Items to Scroll:
                    <input 
                        type="number" 
                        value={settings.itemToScroll} 
                        onChange={(e) => setSettings({ ...settings, itemToScroll: Number(e.target.value) })} 
                        className="ml-2 p-1 border rounded"
                        min={1}
                    />
                </label>

                <label className="block mb-2">
                    <input 
                        type="checkbox" 
                        checked={settings.arrows} 
                        onChange={(e) => setSettings({ ...settings, arrows: e.target.checked })} 
                        className="mr-2"
                    />
                    Show Arrows
                </label>

                <label className="block mb-2">
                    <input 
                        type="checkbox" 
                        checked={settings.dots} 
                        onChange={(e) => setSettings({ ...settings, dots: e.target.checked })} 
                        className="mr-2"
                    />
                    Show Dots
                </label>

                <label className="block mb-2">
                    <input 
                        type="checkbox" 
                        checked={infi} 
                        onChange={(e) => {
                            setInfi(e.target.checked);
                            setSettings({ ...settings, autoPlay: e.target.checked ? true : false })
                        }} 
                        className="mr-2"
                    />
                     Autoplay Loop 2000s , 2s
                </label>

                <label className="block mb-2">
                    <input 
                        type="checkbox" 
                        checked={settings.infinite} 
                        onChange={(e) => setSettings({ ...settings, infinite: e.target.checked })} 
                        className="mr-2"
                    />
                     Infinite
                </label>
            </div>

            {/* Carousel */}
            {/* <AnilCarasoul {...settings}
              slideBoxClassName='p-2'
            >
                {[1, 2, 3, 4, 5, 6 , 7].map((elem) => (
                    <div key={elem} className='bg-green-300 h-69 w-full flex place-content-center place-items-center'>
                        {elem}
                        <img src={`https://picsum.photos/100?random=${elem}`} alt={`Slide ${elem}`} />
                    </div>  
                ))}
            </AnilCarasoul> */}

            <p>{projects.length}</p>
            <div className='mt-5 p-15'>
                <h2>A Real Life Example Project list</h2>

                <AnilCarasoul {...settings}
                    // gapBetweenBox={10}
                >
                {projects.map((project, index) => (
                <ProjectCard {...project}
                 />
                 ))}
                </AnilCarasoul>

            </div>


        {/* <Slider {...settings2}>
        <div className='border-2'>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
        </Slider> */}
                 
        </div>
    );
};

export default CarasoulPage;
