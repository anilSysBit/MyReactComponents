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
    previewMultiple?:number;
}

const AnilMagnifier:React.FC<MagnifierProps> = ({
    image,
    zoomLevel=2,
    previewMultiple=2,
    // zaliHeight=100,
    // zaliWidth=100,
}) => {
    // states
    const [isZooming,setIsZooming] = useState<boolean>(false);
    const [zaliActive,setZaliActive] = useState<boolean>(false);
    const [[zaliX,zaliY],setZaliPosition] = useState<[number,number]>([0,0]);
    const [[zaliHeight,zaliWidth],setZaliArea] = useState<[number,number]>([0,0]);
    const [[mouseX,mouseY],setMousePosition] = useState<[number,number]>([0,0])
    const [[leftWidth,topHeight],setVerticalHeight] = useState<[number,number]>([0,0]);
    const [[rightWidth,bottomHeight],setHorizontalWidth] = useState<[number,number]>([0,0]);
    const imageContainerRef = useRef<HTMLDivElement | null>(null);
    const magnifiedImageRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [[imageWidth,imageHeight],setImageAxis] = useState<[number,number]>([0,0])
    const [magnifiedPosition,setMagnifiedPosition] = useState<number>(0);
    // const defaultImage = 'https://i.redd.it/zziah8ln4ttb1.jpg'
    const defaultImage = "https://th.bing.com/th/id/OIP.kasbvyxrOBq5LxyycYg3fgHaIY?rs=1&pid=ImgDetMain"
    

    // const [zaliHeight,zaliWidth] = [100,150]
    // const zaliHeight = 100
    // const zaliWidth = 100


    const imageContainerStyle:React.CSSProperties = {
        height:'300px',
        width:'300px',
        zIndex:20,
    }
    const mainContainerTyle:React.CSSProperties = {
        padding:'5px'
    }
    const magnifiedImageStyle:React.CSSProperties = {
        border:'1px solid black',
        height:`${imageHeight * previewMultiple}px`,
        width: `${imageWidth * previewMultiple}px` ,
        zIndex:100,
        position:'relative',
        overflow:'hidden',
        
    }

    const MCD:number = 50; //mouse center distance

    const handleMouseOver =(e:React.MouseEvent)=>{
        // console.log('mouse positon',e.clientX,e.clientY)
        if(imageContainerRef.current){
            const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
            setZaliArea([height/ 2, width / 2])
            setImageAxis([width,height])
            console.log('container azis',height,width)
            // const {naturalWidth,naturalHeight} = imageRef.current
            // setImageAxis([naturalHeight,naturalWidth])
            // console.log("Natural height and width",naturalHeight,naturalWidth)
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
    <div className='p-2 flex flex-wrap gap-2'>

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
                border:'1px solid white',
                height:`${zaliHeight}px`,
                width:`${zaliWidth}px`,
                left:zaliX,
                top:zaliY,
            }}
            >
        </div>
            <img src={defaultImage || image} className='mx-auto' alt="" ref={imageRef}/>
        </div>
        <div 
            className='preview'
            style={magnifiedImageStyle}
            ref={magnifiedImageRef}
            
        >
            <img
              src={defaultImage}
              style={{
                position: 'absolute',
                height:'100%',
                margin:'auto',
                width:'100%',
                left: `${(-zaliX * previewMultiple *  zoomLevel)  }px`,
                top: `${(-zaliY * previewMultiple *  zoomLevel ) }px`,
                transform: `scale(${zoomLevel})`,
                transformOrigin: '0 0',
                pointerEvents: 'none'
              }}
              alt="Magnified"
            />
        </div>
    </div>
  )
}

export default AnilMagnifier