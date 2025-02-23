import React from 'react'
import AnilMagnifier from '../components/magnifier/AnilMagnifier'
import ImageMagnifier from '../components/magnifier/BubbleMagnifier'

const Magnifier = () => {
  const defaultImage = 'https://i.redd.it/zziah8ln4ttb1.jpg'

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

    <AnilMagnifier/>
    </>
  )
}

export default Magnifier