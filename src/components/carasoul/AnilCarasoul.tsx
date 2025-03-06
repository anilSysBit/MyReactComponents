import { ArrowRight, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { convertLength } from '@mui/material/styles/cssUtils';
import React, { useEffect, useRef, useState } from 'react'
import { G } from 'react-router/dist/development/fog-of-war-CCAcUMgB';

import CarasoulProps from './carasoulType';

const AnilCarasoul:React.FC<CarasoulProps> = ({
    children,
    itemsToShow=1,
    itemToScroll=1,
    dots=true,
    arrows=true,
    infinite=0,
    slideBoxClassName,
    boxParentClassName,
    scrollDuration=500,
    gapBetweenBox=0,

    }) => {
    const sliderContainerRef = useRef<HTMLDivElement | null>(null);
    const sliderComponentRef = useRef<HTMLDivElement | null>(null);



    const [componentWidth,setComponentWidth] = useState<number>(0);
    const [containerWidth,setContainerWidth] = useState<number>(0);
    const [scrollWidth,setScrollWidth]  = useState<number>(0);

    const [[mouseX,mouseY],setMousePosition] = useState<[number,number]>([0,0])
    const [[downX,downY],setCursorDownPoint] = useState<[number,number]>([0,0])
    const [[startX,startY],setDragStartPoint] = useState<[number,number]>([0,0])

    const [dragging,setDragging] = useState<boolean>(false);
    const [cursorType,setCursorType] = useState<string>('grab');
    const [transformWidth,setTransformWidth] = useState<number>(0);
    const [transformingWidth,setTransformingWidth] = useState<number>(0);
    const [activeIndex,setActiveIndex] = useState<number>(1);
    const [dotIndex,setDotIndex] = useState<number>(1);

    const [prevBtnStatus,setPrevBtnStatus] = useState<boolean>(false);
    const [nextBtnStatus,setNextBtnStatus] = useState<boolean>(false);
    const [activeTransform,setActiveTransform] = useState<boolean>(false);


    // management of nodews
    const childrenArray = React.Children.toArray(children);
    const dataArray = Array.from({ length: childrenArray.length }, (_, i) => i + 1);

    // console.log('data array',dataArray)
    const componentLength:number = dataArray.length
    const convertedArray = [...childrenArray.slice(-itemToScroll),...childrenArray,...childrenArray.slice(0,childrenArray.length)]
    // console.log('converetd array',convertedArray)
    const convertedLength:number = convertedArray.length


    const getContainerData  =()=>{
        if(sliderContainerRef.current){
            // slider container 
            const rect = sliderContainerRef.current.getBoundingClientRect();
            const rectWidth = rect.width
            setContainerWidth(rectWidth);
            let screwWidth = ((rectWidth / itemsToShow) * itemToScroll);
            setScrollWidth(screwWidth)

            setComponentWidth(screwWidth);
            setTransformingWidth(screwWidth)
            setTransformWidth(screwWidth)
            console.log('Rect Width',screwWidth)

        }


    }

    // console.log('container width',scrollWidth,componentWidth)



    // console.log('container width',containerWidth)

    // window.addEventListener('resize',()=>{
    //     getContainerData();
    // })

    useEffect(()=>{
        getContainerData();
    },[itemsToShow,itemToScroll,arrows,dots])


    const handleTransformMovement =()=>{
        setTransformWidth(activeIndex * containerWidth)
    }

    // component function
    const handleMouseMove =(e:React.MouseEvent | React.TouchEvent)=>{
        // setMousePosition([event.clientX,event.clientY])
        let clientX;
        let clientY;
        if ("touches" in e) {
            clientX = e.touches[0].clientX
            clientY = e.touches[0].clientY
        } else {
            clientX = e.clientX
            clientY = e.clientY
        }
        if(dragging){
            // console.log('mouse position',mouseX,mouseY);
            let newWidth = startX - clientX;


            // const prevTransformedWidth = transformWidth;
            const newCalculatedWidth = transformWidth + newWidth
            // console.log('new width',newWidth)
            if(newCalculatedWidth < 0){
                setTransformingWidth(0)
                return;
            }

            if(newCalculatedWidth > componentWidth * (convertedLength - 1)){
                console.log('excedding')
                setTransformingWidth(componentWidth * (convertedLength - 1))
                return;
            }

            setTransformingWidth(newCalculatedWidth)

            // if(transfor)
 
        

                
        }

    }

    const handleDragStart =(e:React.DragEvent<HTMLDivElement>)=>{
        // setDragging(true);
        // console.log('yes dragging has started')
        // if(sliderContainerRef.current){
        //     const rect = sliderContainerRef.current.getBoundingClientRect()
            
        // }
    }

    const handleMouseEnter =(e:React.MouseEvent<HTMLDivElement>)=>{
        // console.log('Clicked to the element')
        // setCursorType('grabbing');
    }

    const handleMouseDown =(e:React.MouseEvent | React.TouchEvent)=>{
        // console.log('Clicked to the element')
        setActiveTransform(false)
        setCursorType('grabbing');
        setDragging(true);
        if ("touches" in e) {
            setDragStartPoint([e.touches[0].clientX, e.touches[0].clientY]);
        } else {
            setDragStartPoint([e.clientX, e.clientY]);
        }
        // console.log('drag start points',e.clientX,e.clientY)

    }

    function getNewIndex(activeIndex:number, indexPosition:number) {
        let d = Math.abs(activeIndex - indexPosition); // Difference calculation
    
        if (activeIndex > indexPosition) {
            return d > 1 / (itemToScroll * 5) ? Math.floor(indexPosition) : activeIndex;
        } else {
            return d > 1 / (itemToScroll * 5) ? Math.ceil(indexPosition) : activeIndex;
        }
    }

    
    

    const calculateAndTranformWithActiveIndex =(position?:number)=>{
        const unscrolledWidth = (componentWidth  * convertedLength) - transformingWidth
        const indexPosition = (convertedLength) -  (unscrolledWidth / componentWidth)
        
        console.log('active index',activeIndex,indexPosition)
        // if(indexPosition < activeIndex/3)
        let absolutePosition = getNewIndex(activeIndex,indexPosition)
        console.log('absolute pos',absolutePosition)

        // setActiveIndex(absolutePosition)
        handleActiveIndex(absolutePosition )
    }

    const handleMouseUp =(e:React.MouseEvent | React.TouchEvent)=>{
        // console.log('leaved the click event')
        setActiveTransform(true);
        setCursorType('grab');
        setDragging(false)
        // now the active index will be calculated 
        if ("touches" in e) {
            setCursorDownPoint([e.touches[0].clientX, e.touches[0].clientY]);
            calculateAndTranformWithActiveIndex(e.touches[0].clientX);
        } else {
            setCursorDownPoint([e.clientX,e.clientY])
            calculateAndTranformWithActiveIndex(e.clientX);
        }
        
    }
    const handleMouseOut =(e :React.MouseEvent | React.TouchEvent)=>{
        setActiveTransform(true);
        setCursorType('grab');
        setDragging(false)
        // now the active index will be calculated 
        if ("touches" in e) {
            setCursorDownPoint([e.touches[0].clientX, e.touches[0].clientY]);
            calculateAndTranformWithActiveIndex(e.touches[0].clientX);
        } else {
            setCursorDownPoint([e.clientX,e.clientY])
            calculateAndTranformWithActiveIndex(e.clientX);
        }
        
    }

    const transformFunction =(indexArg:number)=>{
        // console.log('new active index timeout',indexArg)

        let conversion = (indexArg) * componentWidth
        setTransformingWidth(conversion)
        setTransformWidth(conversion)
        setActiveIndex(indexArg)

    }

    const adjustIndex =(index:number)=>{
        let adjustedIndex:number = index - itemToScroll
        if (adjustedIndex < 0){
            adjustedIndex += componentLength
        }
        setDotIndex(adjustedIndex)
    }

    const handleActiveIndex =(index:number)=>{
        console.log('index',index)
        setActiveTransform(true)
        // adjustIndex(index)r
        let newActiveIndex = index;
        transformFunction(newActiveIndex);
        setTimeout(()=>{
            // setActiveTransform(false);
            // reversing the scroll option
            if(index==0){
            setActiveTransform(false);
                newActiveIndex = Math.round(componentLength / itemToScroll)
                transformFunction(newActiveIndex)
            }else if(index == Math.round(componentLength / itemToScroll) + 1){
            setActiveTransform(false);

                newActiveIndex = index - (componentLength / itemToScroll)
                transformFunction(newActiveIndex)
            }


        },scrollDuration)
    }

    // console.log('dot index',dotIndex)

    const calculateWidthDots =()=>{

    }





    const sliderComponentStyle:React.CSSProperties = {
        cursor:cursorType,
        width:`${containerWidth * convertedLength}px`,
        transform:`translate3d(-${transformingWidth}px,0px,0px)`,
        transition:activeTransform ? `-webkit-transform ${scrollDuration}ms`:'',
        gap:`${gapBetweenBox}px`
    }


    const handleDotClick =(index:number)=>{
        // setActiveIndex(index)
        // setTransformingWidth(index * componentWidth)
        // let adjustedIndex:number = index + (itemsToShow-itemToScroll)
        // if (adjustedIndex < 1){
        //     adjustedIndex -= componentLength
        // }
        handleActiveIndex(index);

    }



    const handlePrevClick =(e:React.MouseEvent)=>{
        // if(activeIndex > 0){
            // setActiveIndex(activeIndex - 1)
            handleActiveIndex(activeIndex - 1)
        
        // }
        // transformFunction(activeIndex)
    }
    const handleNextClick =(e:React.MouseEvent)=>{
        if(activeIndex < componentLength){
            // setActiveIndex(activeIndex + 1)
            handleActiveIndex(activeIndex + 1)
        }
        // transformFunction(activeIndex)
    }


    const autoLoopFunction =()=>{
        setInterval(()=>{
            // console.log('active index');
            // handleActiveIndex(activeIndex + 1)
        },2000)
    }

    useEffect(()=>{
        let intervalId:any;
        if(infinite > 0){
        let i = 1;
        intervalId = setInterval(()=>{
            if (i > componentLength) {
                i = 1; // Reset to 1 when i > componentLength
              } else {
                i = i + 1; // Otherwise increment
              }
            handleActiveIndex(i)
        },infinite)
        }
    },[componentWidth,infinite])
      

    // console.log('converted array',convertedArray)
  return (
    <div className='p-2'>
    <div className="carasoul_page relative">
        <div 
            className="carasoul-main-container overflow-hidden transition-transform" 
            ref={sliderContainerRef} 
            onDragStart={handleDragStart}
            onMouseMove={handleMouseMove} 
            onMouseEnter={handleMouseEnter} 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseOut}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleMouseMove}
            >
            <div 
                className={`carasoul_container flex ${boxParentClassName}`}
                ref={sliderComponentRef}
                style={sliderComponentStyle}
                >
                
                {convertedArray.map((child,index)=>{
                    return(
                        <div key={index} data-index={index-itemsToShow} className={`slide-box ${slideBoxClassName}`} style={{width:`${containerWidth/itemsToShow}px`}}>
                            {child}
                        </div>
                    )
                })}

            </div>
        </div>
        {arrows && 
        <>
        <button 
            onClick={handlePrevClick} 
            disabled={prevBtnStatus} 
            className={`prev_btn absolute top-1/3 rounded-full h-10 w-10 bg-slate-300 cursor-pointer ${prevBtnStatus && 'opacity-70'}`}>
            <KeyboardArrowLeft/>
        </button>
        <button 
            onClick={handleNextClick} 
            disabled={nextBtnStatus} 
            className={`next_btn absolute top-1/3 right-0 rounded-full h-10 w-10 bg-slate-300 cursor-pointer hover:shadow shadow-slate-600 ${nextBtnStatus && 'opacity-70'}`}>
                <KeyboardArrowRight/>
        </button>
        </>}
        {dots && <div className="dots flex  gap-2 place-content-center place-items-center p-2">
            {Array.from({length:Math.ceil(componentLength/itemToScroll)}).map((_,index2)=>(
                <span key={index2} onClick={()=>handleDotClick(index2+1)} className={`h-3 w-3 rounded-full cursor-pointer ${activeIndex == index2+1 ?  'bg-slate-500' : 'bg-slate-200'}`}></span>
            ))}
        </div>}
    </div>
    </div>
  )
}

export default AnilCarasoul