import React from 'react'
import AnilMagnifier from '../components/magnifier/AnilMagnifier'
import ImageMagnifier from '../components/magnifier/BubbleMagnifier'

const Magnifier = () => {
  // const defaultImage = 'https://i.redd.it/zziah8ln4ttb1.jpg'
    // const defaultImage = "https://th.bing.com/th/id/OIP.kasbvyxrOBq5LxyycYg3fgHaIY?rs=1&pid=ImgDetMain"
  const defaultImage = "https://ethanselzer.github.io/react-image-magnify/static/media/wristwatch_687.8ea75ffc.jpg"
  // const defaultImage ='https://picsum.photos/500/600' 
  return (
    <>
    <ImageMagnifier
      height={300}
      width={300}
      magnifierHeight={200}
      magnifierWidth={200}
      src={defaultImage}
    />
    <hr />

    <AnilMagnifier
    width={350}
    height={400}
    previewMultiple={1}
    image={defaultImage}
    zaliMultiple={2}
    />
    </>
  )
}

export default Magnifier