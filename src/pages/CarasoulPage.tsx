import React from 'react'
import AnilCarasoul from '../components/carasoul/AnilCarasoul'
import CarasoulProps from '../components/carasoul/carasoulType'
const CarasoulPage = () => {

    const settings:CarasoulProps = {
        itemsToShow:2,
        itemToScroll:1,
        arrows:false,
        dots:true,
    }
  return (
    <AnilCarasoul {...settings}>
        {[1,2,3,4,5,6].map((elem,index)=>{
            return(
                <div className='bg-green-300 h-full w-full% flex place-content-center place-items-center'>{elem}
                    <img src={`https://picsum.photos/100?random=${elem}`} alt="" />
                 </div>
            )
        })}
    </AnilCarasoul>
    
  )
}

export default CarasoulPage