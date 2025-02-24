import { Height, TopicRounded } from '@mui/icons-material';
import { Hidden } from '@mui/material';
import React, { HTMLAttributes, useState,useRef } from 'react'
import { CSSProperties } from 'styled-components';
// import Magnifier from '../../pages/Magnifier';


interface MagnifierProps{
    image:string;
    mainContainerStyle?:CSSProperties,
    zoomLevel?:number;
    zaliHeight?:number;
    zaliWidth?:number;
    previewMultiple?:number;
    width?:number;
    height?:number;
    previewMargin?:number;
    previewClassName?:string;
    containerClassName?:string;
    zaliMultiple?:number;
}

const AnilMagnifier:React.FC<MagnifierProps> = ({
    image,
    zoomLevel=2,
    previewMultiple=1,
    width=300,
    height=300,
    previewMargin=20,
    previewClassName,
    containerClassName,
    zaliMultiple=2,
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
    // const [[containerWidth,containerHeight],setImageAxis] = useState<[number,number]>([0,0])

    const [magnifiedPosition,setMagnifiedPosition] = useState<number>(0);
    // const defaultImage = 'https://i.redd.it/zziah8ln4ttb1.jpg'
    // const defaultImage = "https://th.bing.com/th/id/OIP.kasbvyxrOBq5LxyycYg3fgHaIY?rs=1&pid=ImgDetMain"
    

    // const [zaliHeight,zaliWidth] = [100,150]
    // const zaliHeight = 100
    // const zaliWidth = 100


    const imageContainerStyle:React.CSSProperties = {
        height:height,
        width:width,
        zIndex:20,
        display:'flex',
        border:'1px solid gray',
        position:'relative',
        cursor:'crosshair'
    }
    const mainContainerTyle:React.CSSProperties = {
        padding:'5px'
    }
    const magnifiedImageStyle:React.CSSProperties = {
        border:'1px solid gray',
        height:`${height * previewMultiple}px`,
        width: `${width * previewMultiple}px` ,
        zIndex:100,
        position:'absolute',
        left:width + previewMargin,
        display:'flex',
        overflow:'hidden',
        visibility:zaliActive ? 'visible': 'hidden'
        
    }

    const MCD:number = 50; //mouse center distance

    const handleMouseOver =(e:React.MouseEvent)=>{
        // console.log('mouse positon',e.clientX,e.clientY)
        setZaliActive(true);
        if(imageContainerRef.current && imageRef.current){
            const imageBounds = imageRef.current.getBoundingClientRect();
            const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
            setZaliArea([height/ (2*zaliMultiple), width / (2*zaliMultiple)])
            setImageAxis([imageBounds.width,imageBounds.height])

            console.log('container azis',imageBounds.height,imageBounds.width)
            // const {naturalWidth,naturalHeight} = imageRef.current
            // setImageAxis([naturalHeight,naturalWidth])
            // console.log("Natural height and width",naturalHeight,naturalWidth)
        }


    }
    const handleMouseMove =(e:React.MouseEvent)=>{
        if(imageContainerRef.current && imageRef.current){
            const containerBounds = imageContainerRef.current.getBoundingClientRect();
            const { left, top, width, height } = containerBounds
            // console.log('left of')
            const xPos = e.clientX;
            const yPos = e.clientY;

            const lWidth = xPos-left
            const yHeight = yPos-top
            setVerticalHeight([lWidth,yHeight])
            console.log(left,top,width,height,xPos,yPos)
            setMousePosition([xPos, yPos])

            const marginLeft = (containerBounds.width - width)/2
            console.log('margin-left',marginLeft)
            // zali position
            let calcZaliX = xPos-left-(zaliWidth/2) + marginLeft
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
        setZaliActive(false);
    }
  return (
    <div className='p-2 flex flex-wrap gap-2'>

        <div 
            className={containerClassName}
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
        {zaliActive && <div 
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
            />}
        
            <img src={image} className='mx-auto' alt="" ref={imageRef}/>
        </div>
        <div 
            className={previewClassName}

            style={magnifiedImageStyle}
            ref={magnifiedImageRef}
            
        >
            <img
              src={image}
              style={{
                position: 'absolute',
                height:'100%',
                marginLeft:`${(width-imageWidth) / 2*zoomLevel}px`,
                left: `${(-zaliX * previewMultiple *  zoomLevel * zaliMultiple)  }px`,
                top: `${(-zaliY * previewMultiple *  zoomLevel *zaliMultiple) }px`,
                transform: `scale(${zoomLevel * zaliMultiple})`,
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