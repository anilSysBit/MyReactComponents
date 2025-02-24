import React, { useState, useEffect, useRef } from 'react';
import { KeyboardDoubleArrowLeft,KeyboardDoubleArrowRight, Scale } from '@mui/icons-material';
const ThumbnailAccordin = () => {


  const data = {
    properties: [
      { id: 0, value: 'https://th.bing.com/th/id/R.4dc924a9df391d69793d059e986d1d09?rik=JQ8cDeryGq1OHA&pid=ImgRaw&r=0' },
      { id: 1, value: 'https://picsum.photos/201' },
      { id: 2, value: 'https://picsum.photos/202' },
      { id: 3, value: 'https://picsum.photos/203' },
      { id: 4, value: 'https://picsum.photos/204' },
      { id: 5, value: 'https://picsum.photos/205' },
      { id: 6, value: 'https://picsum.photos/206' },
      { id: 7, value: 'https://picsum.photos/207' },
  
    ]
  }

  const thumb = useRef(null);
  const [imageval, setImageval] = useState(data.properties[0]);
  const [property,setProperty] = useState(data.properties[0])
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [cursor,setCursor] = useState(false);
  const [showZoomedImage,setShowZoomedImage] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

  const containerRef = useRef();

  const onThumbnailClick = (index) => {
    setImageval(data.properties[index]);
  };

  const handleMouseOver =(index)=>{
    setImageval(images[index])
  }


  // Scroll to the next position
  const handleScrollNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 100, // Adjust the value as needed
        behavior: "smooth" // Smooth scrolling animation
      });
    }
  };

  // Scroll to the previous position
  const handleScrollPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 100, // Adjust the value as needed
        behavior: "smooth" // Smooth scrolling animation
      });
    }
  };

  const handleMouseMove = (event) => {
    setCursor(true);
    setShowZoomedImage(true);

    // Get mouse coordinates from the event object
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Update the state with mouse position
    setMousePosition({ x: mouseX, y: mouseY });

    const elem = event.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };
  
  const handleMouseOut =()=>{
    setShowZoomedImage(false);
    setCursor(false);
  }

  const magnifierHeight = 200
  const  magnifieWidth = 200
 const zoomLevel = 2
  const MagnifierStyle = {
    display: showZoomedImage ? "" : "none",
    position: "absolute",
    pointerEvents: "none",
    opacity: "1", // reduce opacity so you can verify position
    border: "1px solid lightgray",
    backgroundColor: "white",
    backgroundImage: `url('${imageval.value}')`,
    backgroundRepeat: "no-repeat",
    // backgroundSize:'cover',

    //calculate zoomed image size
    backgroundSize: `${imgWidth * zoomLevel}px ${
      imgHeight * zoomLevel
    }px`,

    //calculate position of zoomed image.
    backgroundPositionX: `${-mousePosition.x-40 * zoomLevel + magnifieWidth}px`,
    backgroundPositionY: `${-mousePosition.y-40 * zoomLevel + magnifierHeight }px`
  }


  return (
    <div className="thumbnail_accordin" ref={thumb}>
      <style>{`
          .active_ani_${imageval.id}{
            animation-name:fade${imageval.id};
            animation-duration:1s;
            animation-timing-function:linear;
            animation-iteration-count:1;
          }
          @keyframes fade${imageval.id} {
            from{opacity: 0;}
            to{opacity: 1;}
          }
      `}</style>
      <div className={` main_image_preview`} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
        {cursor && <span className='mouse_elem' style={{
          position:'absolute',
          left:mousePosition.x-130,
          top:mousePosition.y-130,
        }}></span>}

        <div className="zoomed_image"
           style={MagnifierStyle}
        >
        </div>
        <img src={imageval.value} alt="photo" className={`active_ani_${imageval.id}`}/>
      </div>
      <div className="thumbnail_image">
        <button className="prev" onClick={handleScrollPrev}><KeyboardDoubleArrowLeft/></button>
        <button className="next" onClick={handleScrollNext}><KeyboardDoubleArrowRight/></button>
        <div className="img_container" ref={containerRef}>
        {data.properties.map((elem, index) => {
          return (
            <img
              src={elem.value}
              alt="thumbnail"
              key={index}
              onClick={() => onThumbnailClick(index)}
              className={elem.id === imageval.id ? 'active' : null}
              // onMouseOver={()=>handleMouseOver(index)}
            />
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailAccordin;
