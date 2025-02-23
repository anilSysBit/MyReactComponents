import { Height, TopicRounded } from '@mui/icons-material';
import { Hidden } from '@mui/material';
import React, { HTMLAttributes, useState,useRef } from 'react'
import { CSSProperties } from 'styled-components';
// import Magnifier from '../../pages/Magnifier';


interface MagnifierProps{
    image?:string;
    mainContainerStyle?:CSSProperties,
    zoomLevel?:number;
    zaliHeight?:number;
    zaliWidth?:number;
}

const AnilMagnifier:React.FC<MagnifierProps> = ({
    image,
    zoomLevel=2,
    zaliHeight=100,
    zaliWidth=100,
}) => {
    // states
    const [isZooming,setIsZooming] = useState<boolean>(false);
    const [zaliActive,setZaliActive] = useState<boolean>(false);
    const [[zaliX,zaliY],setZaliPosition] = useState<[number,number]>([0,0]);
    const [[mouseX,mouseY],setMousePosition] = useState<[number,number]>([0,0])
    const [[leftWidth,topHeight],setVerticalHeight] = useState<[number,number]>([0,0]);
    const [[rightWidth,bottomHeight],setHorizontalWidth] = useState<[number,number]>([0,0]);
    const imageContainerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [[imageHeight,imageWidth],setImageAxis] = useState<[number,number]>([0,0])
    const [magnifiedPosition,setMagnifiedPosition] = useState<number>(0);
    const defaultImage = 'https://picsum.photos/1200/1500'

    // const [zaliHeight,zaliWidth] = [100,150]


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
        border:'1px solid black',
        height:'300px',
        width:'300px',
        zIndex:100,
        position:'relative',
        overflow:'hidden',
        backgroundImage: `url(${defaultImage})`,
        backgroundSize: `${300 * zoomLevel}px ${
            300 * zoomLevel
          }px`,
        pointerEvents: 'none',
        
        // transform: 'translate(-50%, -50%)',
        backgroundRepeat:"no-repeat",
        backgroundPositionX: `${-zaliX - (zaliHeight / 2) * zoomLevel}px`,
        backgroundPositionY: `${-zaliY - (zaliWidth / 2) * zoomLevel}px`
    }

    const MCD:number = 50; //mouse center distance

    const handleMouseOver =(e:React.MouseEvent)=>{
        
        // console.log('mouse positon',e.clientX,e.clientY)
        if(imageRef.current){
            const {naturalWidth,naturalHeight} = imageRef.current
            setImageAxis([naturalHeight,naturalWidth])
            console.log("Natural height and width",naturalHeight,naturalWidth)
        }


    }
    const handleMouseMove =(e:React.MouseEvent)=>{
        if(imageContainerRef.current){
            const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();

            const xPos = e.clientX;
            const yPos = e.clientY;
            const lWidth = xPos-left
            const yHeight = yPos-top
            setVerticalHeight([lWidth,yHeight])
            // console.log(left,top,width,height,xPos,yPos)
            setMousePosition([xPos, yPos])

            // zali position
            let calcZaliX = xPos-left-(zaliWidth/2)
            let calcZaliY = yPos-top-(zaliHeight/2)

            setZaliPosition([calcZaliX,calcZaliY]);

            // overlaping right
            if(lWidth+(zaliWidth/2) >= width){
                const overtakingX = lWidth+(zaliWidth / 2) - width
                calcZaliX  -= overtakingX
                // console.log('overtaking',overtakingX)
            }
            // overlapping bottom
            // console.log('lwidth,yHeight',lWidth,yHeight)
            if(yHeight + (zaliHeight / 2) >= height){
                const overtakingY = yHeight + (zaliHeight / 2) - height
                calcZaliY -= overtakingY
                // setZaliPosition([calcZaliX,calcZaliY - overtakingY])
            }
            // overlapping left
            if(lWidth - (zaliWidth / 2) <= 0){
                const overtakingX = lWidth - (zaliWidth / 2)
                // console.log('Yes Width less than zero',overtakingX)
                calcZaliX -= overtakingX
            }
            // overlapping top
            if(yHeight - (zaliWidth / 2) <= 0){
                const overtakingY = yHeight - (zaliHeight / 2)
                // console.log('Yes Width less than zero',overtakingY)
                calcZaliY -= overtakingY
            }
            setZaliPosition([calcZaliX,calcZaliY])


            // const imagePosition = `-${(xPos / width) * zoomLevel * 100}% -${(yPos / height) * zoomLevel * 100}%`;
            // setMagnifiedPosition(parseInt(imagePosition))
        }
    }
    const handleMouseOut =(e:React.MouseEvent)=>{

    }
  return (
    <div className='p-2'>

        <div 
            className="img_container flex cursor-crosshair border-2 relative overflow-hidden" 
            style={imageContainerStyle} 
            ref={imageContainerRef}
            onMouseOver={handleMouseOver}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
            >
                <div 
                    style={{
                        width:leftWidth,
                        height:'100%',
                        // border:'1px solid white',
                        position:'absolute',
                        // backgroundColor:'rgba(0,0,0,0.6)'
                    }}
                    
                    />

                <div 
                    style={{
                        width:'100%',
                        height:topHeight,
                        // border:'1px solid yellow',
                        position:'absolute',
                        // backgroundColor:'rgba(0,0,0,0.6)',

                    }}
                        />
        <div 
            className=""
            // ref={lensRef}
            style={{
                position:'absolute',
                backgroundColor:'rgba(0,0,0,0.6)',
                height:`${zaliHeight}px`,
                width:`${zaliWidth}px`,
                left:zaliX,
                top:zaliY,
            }}
            >
        </div>
            <img src={defaultImage || image} className='m-auto h-full'  alt="" ref={imageRef}/>
        </div>
        <div 
            className='preview'
            style={magnifiedImageStyle}
            
        >
        </div>
    </div>
  )
}

export default AnilMagnifier