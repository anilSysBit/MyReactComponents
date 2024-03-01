import React, { useState, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
const ThumbnailAccordin = () => {
  const data = {
    properties: [
      { id: 0, value: 'https://picsum.photos/200' },
      { id: 1, value: 'https://picsum.photos/201' },
      { id: 2, value: 'https://picsum.photos/202' },
      { id: 3, value: 'https://picsum.photos/203' },
      { id: 4, value: 'https://picsum.photos/204' },
      { id: 5, value: 'https://picsum.photos/205' },
      { id: 6, value: 'https://picsum.photos/206' },
      { id: 7, value: 'https://picsum.photos/207' },
  
    ]
  }

  const images = [
    { id: 0, value: 'https://picsum.photos/200' },
    { id: 1, value: 'https://picsum.photos/201' },
    { id: 2, value: 'https://picsum.photos/202' },
    { id: 3, value: 'https://picsum.photos/203' },
    { id: 4, value: 'https://picsum.photos/204' },
    { id: 5, value: 'https://picsum.photos/205' },
    { id: 6, value: 'https://picsum.photos/206' },
    { id: 6, value: 'https://picsum.photos/207' },
  ]

  const thumb = useRef(null);
  const [imageval, setImageval] = useState(data.properties[0]);
  const [properties,setProperties] = useState(data.properties)
  const [property,setProperty] = useState(data.properties[0])
  const [value,setValue] = useState(0);

  const onThumbnailClick = (index) => {
    setImageval(data.properties[index]);
  };

  const handleMouseOver =(index)=>{
    setImageval(images[index])
  }


  const handleNext = () => {
    const newIndex = property.id +1
    setProperty(data.properties[newIndex])
  };
  const handlePrev = () => {
    const newIndex = property.id -1
    setProperty(data.properties[newIndex])
  };

// console.log(property)

  // console.log(translateVal)

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
      <div className={` main_image_preview`}>
        <img src={imageval.value} alt="photo" className={`active_ani_${imageval.id}`}/>
      </div>
      <div className="thumbnail_image">
        <button className="prev" onClick={handlePrev} disabled={property.id === 0} >Prev</button>
        <button className="next" onClick={handleNext} disabled={property.id === data.properties.length-1}>Next</button>
        <div className="img_container">
        {data.properties.map((elem, index) => {
          let transform = property.id*(900/(properties.length));
          return (
            <img
              style={{
                transform:`translateX(-${transform}%)`,
              }}
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
