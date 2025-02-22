import { Hidden } from '@mui/material';
import React, { HTMLAttributes, useState,useRef } from 'react'
import { CSSProperties } from 'styled-components';
// import Magnifier from '../../pages/Magnifier';


interface MagnifierProps{
    image?:string;
    mainContainerStyle?:CSSProperties,
    zoomLevel?:number;
}

const AnilMagnifier:React.FC<MagnifierProps> = ({
    image,
    zoomLevel=2,
}) => {
    // states
    const [isZooming,setIsZooming] = useState<boolean>(false);
    const [[mouseX,mouseY],setMousePosition] = useState<[number,number]>([0,0])
    const imageContainerRef = useRef<HTMLDivElement | null>(null);
    const lensRef = useRef<HTMLDivElement | null>(null);
    const [magnifiedPosition,setMagnifiedPosition] = useState<number>(0);
    const defaultImage = 'https://picsum.photos/1000'

    const imageContainerStyle:React.CSSProperties = {
        height:'300px',
        width:'300px',
        zIndex:20,
    }
    const mainContainerTyle:React.CSSProperties = {
        padding:'5px'
    }
    const magnifiedImageStyle:React.CSSProperties = {
        marginTop:'5px',
        // padding:'5px',
        border:'1px solid black',
        height:'300px',
        width:'300px',
        boxSizing:'border-box',
        // transform:'scale3d(1,1,1)', 
        zIndex:100,
        overflow:'hidden',
        // backgroundColor:'white'
        // display:'block'
    }

    const mouseCenteredDistance:number = 50;

    const handleMouseOver =(e:React.MouseEvent)=>{
        if(imageContainerRef.current){
            const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
            const xPos = e.clientX - left;
            const yPos = e.clientY - top;
            setMousePosition([xPos, yPos]);
            const imagePosition = `-${(xPos / width) * zoomLevel * 100}% -${(yPos / height) * zoomLevel * 100}%`;
            setMagnifiedPosition(parseInt(imagePosition))
        }
        // console.log('mouse positon',e.clientX,e.clientY)

    }
    const handleMouseMove =(e:React.MouseEvent)=>{
        setMousePosition([e.clientX, e.clientY]);
        console.log('mouse positon',e.clientX,e.clientY)
    }
    const handleMouseOut =(e:React.MouseEvent)=>{

    }
  return (
    <div className='p-2'>

        <div 
            className="img_container cursor-crosshair border-2 relative overflow-hidden" 
            style={imageContainerStyle} 
            ref={imageContainerRef}
            onMouseOver={handleMouseOver}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
            >
        <div 
            className="zali_filter absolute h-20 w-20 bg-slate-500"
            // ref={lensRef}
            style={{
                left:mouseX - mouseCenteredDistance,
                top:mouseY - mouseCenteredDistance
            }}
            >
        </div>
            <img src={defaultImage || image} alt="" />
        </div>
        <div 
            className='preview'
            style={magnifiedImageStyle}
            
        >
            <img 
                src={defaultImage || image} 
                alt=""
                style={{
                    // position:'absolute',
                    left:0,
                    top:0,
                    height:'1200px',
                    width:'1800px',
                    transform:`translate(${mouseX * 5}px,${-mouseY * 2}px)`,
                    
                    // width:'auto',
                    // visibility:'hidden',
                    zIndex:1,
                }}
            />

        </div>
    </div>
  )
}

export default AnilMagnifier