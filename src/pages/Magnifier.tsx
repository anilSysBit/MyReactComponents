import React from 'react'
import AnilMagnifier from '../components/magnifier/AnilMagnifier'
import ImageMagnifier from '../components/magnifier/BubbleMagnifier'

const Magnifier = () => {
  const defaultImage = 'https://i.redd.it/zziah8ln4ttb1.jpg'
    // const defaultImage = "https://th.bing.com/th/id/OIP.kasbvyxrOBq5LxyycYg3fgHaIY?rs=1&pid=ImgDetMain"

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
    height={350}
      image={defaultImage}
    />
    </>
  )
}

export default Magnifier