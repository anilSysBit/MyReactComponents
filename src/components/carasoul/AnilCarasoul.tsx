import { ArrowRight, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { convertLength } from '@mui/material/styles/cssUtils';
import React, { useEffect, useRef, useState } from 'react'
import { G } from 'react-router/dist/development/fog-of-war-CCAcUMgB';
import './slider.css';
// import CarasoulProps from './carasoulType';
import type { CarasoulProps, cssClassesType, slickStylesType } from './carasoulType';

const AnilCarasoul:React.FC<CarasoulProps> = ({
    children,
    itemsToShow=1,
    itemToScroll=1,
    dots=true,
    arrows=true,
    infinite=false,
    scroll=true,
    autoPlay=false,
    speed=2000,
    scrollDuration=500,
    gapBetweenBox=0,
    style,
    cssClasses,
    removeArrowOnDisabled=false,

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
    const [activeIndex,setActiveIndex] = useState<number>(0);
    const [dotIndex,setDotIndex] = useState<number>(1);

    const [prevBtnStatus,setPrevBtnStatus] = useState<boolean>(false);
    const [nextBtnStatus,setNextBtnStatus] = useState<boolean>(false);
    const [activeTransform,setActiveTransform] = useState<boolean>(false);


    // management of nodews
    const childrenArray = React.Children.toArray(children);
    const dataArray = Array.from({ length: childrenArray.length }, (_, i) => i + 1);

    // console.log('data array',dataArray)
    const componentLength:number = dataArray.length
    const changedArray = [...childrenArray.slice(-itemToScroll),...childrenArray,...childrenArray.slice(0,childrenArray.length)]
    const convertedArray = infinite ? changedArray : childrenArray;
    // console.log('converetd array',convertedArray)
    const convertedLength:number = convertedArray.length
    
    const dotLength =  Math.ceil((componentLength - itemsToShow) / itemToScroll)   + 1;
    const dotArray = Array.from({length:dotLength})

    const getContainerData  =()=>{
        if(sliderContainerRef.current){
            // slider container 
            const rect = sliderContainerRef.current.getBoundingClientRect();
            const rectWidth = rect.width
            setContainerWidth(rectWidth);
            let screwWidth = (rectWidth / itemsToShow) * itemToScroll;
            setScrollWidth(screwWidth)

            setComponentWidth(screwWidth);
            // setTransformingWidth(screwWidth)
            // setTransformWidth(screwWidth)

            calculateAndTranformWithActiveIndex(0);
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
            if(!infinite){
                if(newCalculatedWidth < 0){
                    // setActiveTransform(false);
                    console.log('new width',newCalculatedWidth)
                    setTransformingWidth(newCalculatedWidth)
                    return;
                }
    
                else if(newCalculatedWidth > componentWidth * (convertedLength - itemToScroll)){
                    console.log('excedding')
                    setTransformingWidth(newCalculatedWidth)
                    return;
                }
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
        // setDragging(true);
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
            return d > 1 / (itemsToShow * 5) ? Math.floor(indexPosition) : activeIndex;
        } else {
            return d > 1 / (itemsToShow * 5) ? Math.ceil(indexPosition) : activeIndex;
        }
    }

    
    

    const calculateAndTranformWithActiveIndex =(position?:number)=>{
        const unscrolledWidth = (componentWidth  * convertedLength ) - transformingWidth
        const indexPosition = (convertedLength) -  (unscrolledWidth / componentWidth)
        
        // console.log('active index',activeIndex,indexPosition)
        // if(indexPosition < activeIndex/3)
        let absolutePosition = getNewIndex(activeIndex,indexPosition)
        // let absolutePosition = 

        if(!infinite){
            const componentStru = componentLength / itemsToShow
            const oddGap = componentLength - itemsToShow
           console.log('calculation', oddGap,dotLength , componentStru)

            // if(itemsToShow == itemToScroll){
            //     const nposition = oddGap / itemsToShow
            //     if(absolutePosition > dotLength - 1 - oddGap){
            //         console.log('Yes on the last position')
            //         absolutePosition = dotLength - oddGap - 1 + nposition
            //     }
            //     console.log('new odd position',oddGap , nposition)
            // }
            
            if(absolutePosition >= dotLength){
                absolutePosition = dotLength - 1
            }else if(absolutePosition < 0){
                absolutePosition = 0
    
            }

            
        }
        // console.log('absolute pos',absolutePosition)

        // setActiveIndex(absolutePosition)
        handleActiveIndex(absolutePosition)
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
        // console.log('index',index)
        setActiveTransform(true)
        // adjustIndex(index)r
        let newActiveIndex = index;
        if(arrows){
            handleArrow(newActiveIndex);
        }
        transformFunction(newActiveIndex);

        
        if(!infinite){
            setTimeout(()=>{
                // setActiveTransform(false);
                // reversing the scroll option
                if(index== -1){
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

    }

    // function that handles the arrow enabling and disabling
    const handleArrow =(index:number)=>{
        // console.log('active index btn ',index)
        if(index <= 0){
            setPrevBtnStatus(true)
            setNextBtnStatus(false)
        }else if(index >= componentLength){
            setNextBtnStatus(true)
            setPrevBtnStatus(false)
        }else{
            setPrevBtnStatus(false)
            setNextBtnStatus(false)
        }
    }


    // console.log('dot index',dotIndex)

    const calculateWidthDots =()=>{

    }





    const sliderComponentStyle:React.CSSProperties = {

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
            // setActiveIndex(activeIndex + 1)
            handleActiveIndex(activeIndex + 1)
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
        if(autoPlay && speed > 0){
        let i = 1;
        intervalId = setInterval(()=>{
            if (i > componentLength) {
                i = 1; // Reset to 1 when i > componentLength
              } else {
                i = i + 1; // Otherwise increment
              }
            handleActiveIndex(i)
        },speed)
        }
    },[autoPlay])
    
    

    // console.log('dot array',componentLength / itemsToShow)
    const defaultStyle:slickStylesType = {
        sliderComponent:{
            display:'flex',
            cursor:cursorType,
            width:`${containerWidth * convertedLength}px`,
            transform:`translate3d(${-transformingWidth}px,0px,0px)`,
            transition:activeTransform ? `-webkit-transform ${scrollDuration}ms`:'',
        },
        slideBox:{
            width:`${containerWidth/itemsToShow}px`,
        },


    }
    
    // console.log('converted array',convertedArray)
  return (
    <div className={`parent-box ${cssClasses?.parentBox || ''}`} c-name="slick-parent-container" style={style?.parentBox}>
    
        <div 
            className={`slick-container ${cssClasses?.slickContainer || ''}`}
            style={{...defaultStyle.slickContainer,...style?.slickContainer}}
            ref={sliderContainerRef} 
            {...(scroll && {
                onDragStart: handleDragStart,
                onMouseMove: handleMouseMove,
                onMouseEnter: handleMouseEnter,
                onMouseDown: handleMouseDown,
                onMouseUp: handleMouseUp,
                onMouseOut: handleMouseOut,
                // onMouseLeave:handleMouseOut,
                onTouchStart: handleMouseDown,
                onTouchEnd: handleMouseUp,
                onTouchMove: handleMouseMove,
              })}
            >
            <div 
                className={`slider-component ${cssClasses?.sliderComponent || ''}`}
                ref={sliderComponentRef}
                style={{...defaultStyle?.sliderComponent , ...style?.sliderComponent}}
                >
                
                {convertedArray.map((child,index)=>{
                    return(
                        <div key={index} data-index={index-itemsToShow} className={`slide-box ${cssClasses?.slideBox || ''}`} style={{...defaultStyle?.slideBox , ...style?.slideBox}}>
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
            style={style?.arrow?.prevArrow}
            className={`arrow prev-btn ${prevBtnStatus && "disabled"} ${cssClasses?.arrow?.prevArrow || ''}`}>
            <KeyboardArrowLeft/>
        </button>
        <button 
            onClick={handleNextClick} 
            disabled={nextBtnStatus}
            style={style?.arrow?.nextArrow}
            className={`arrow next-btn ${nextBtnStatus && "disabled"} ${cssClasses?.arrow?.nextArrow || ''}`}>
                <KeyboardArrowRight/>
        </button>
        </>}
        {dots && <div  style={style?.dots?.parent} className={`dots-container ${cssClasses?.dots?.parent || ''}`}>
            {dotArray.map((_,index2)=>(
                <span  style={style?.dots?.dot} key={index2} onClick={()=>handleDotClick(index2)} className={`dot ${index2 ==Math.ceil(activeIndex) ? 'active' : '' } ${cssClasses?.dots?.dot || ''}`}></span>
            ))}
        </div>}
    </div>
  )
}

export default AnilCarasoul