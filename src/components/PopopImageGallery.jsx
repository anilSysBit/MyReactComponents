
import React, { useState } from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const PopImageGallery = () => {
    const images = [
        'https://picsum.photos/1000/600',
        'https://picsum.photos/502',
        'https://picsum.photos/305',
        'https://picsum.photos/503',
        'https://picsum.photos/506',
    ]
    const [index,setIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);


    const handlePrevClick =()=>{
        if(index > 0){
            setIndex(prev => prev - 1)
        }
    }
    const handleNextClick =()=>{
        if(index < images.length-1){
            setIndex(prev => prev + 1)
        }
    }

    const handleScroll = (event) => {
        // Determine the direction of the scroll
        const scrollDelta = event.deltaY || event.detail || event.wheelDelta;
    
        // Adjust the zoom level based on scroll direction
        if (scrollDelta < 0) {
          // Increase zoom level
          setZoomLevel(prevZoomLevel => Math.min(prevZoomLevel + 0.1, 3)); // Set maximum zoom level to 3
        } else {
          // Decrease zoom level only if it's greater than the original size (1)
          if (zoomLevel > 1) {
            setZoomLevel(prevZoomLevel => Math.max(prevZoomLevel - 0.1, 1)); // Set minimum zoom level to 1
          }
        }
      };

      const handleZoomClick =()=>{
        setZoomLevel(1)
      }

  return (
    <div className="pop_image_gallery">
            <p>scroll to zoom</p>
        <div className="pop_image_gallery_sm">
            <style>{`
                .arrow{
                    display: ${zoomLevel === 1 ? 'flex': 'none'}
                }
            `}</style>
            <span className='arrow arrow1' onClick={handlePrevClick}><ArrowCircleLeftIcon sx={{
                backgroundColor:'green',
                fontSize:"40px",
                padding:'5px',
                borderRadius:'5px'
            }}/></span>
            <div className="img_box">
            <img src={images[index]} alt="img" loading='lazy' onWheel={handleScroll} onClick={handleZoomClick} style={{
                transform:`scale(${zoomLevel})`
            }}/>
            </div>
            <span className='arrow arrow2' onClick={handleNextClick}><ArrowCircleRightIcon sx={{
                backgroundColor:'green',
                fontSize:"40px",
                padding:'5px',
                borderRadius:'5px'
            }}/></span>
        </div>
    </div>
  )
}

export default PopImageGallery