import { ArrowRight, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react'

interface CarasoulProps{
    itemsToShow?:number;
    showPrevNextBtn?:boolean;
}

const CarasoulPage:React.FC<CarasoulProps> = ({
    itemsToShow=1,
    showPrevNextBtn=true,

    }) => {
    const sliderContainerRef = useRef<HTMLDivElement | null>(null);
    const sliderComponentRef = useRef<HTMLDivElement | null>(null);



    const [componentWidth,setComponentWidth] = useState<number>(0);
    const [containerWidth,setContainerWidth] = useState<number>(0);

    const [[mouseX,mouseY],setMousePosition] = useState<[number,number]>([0,0])
    const [[downX,downY],setCursorDownPoint] = useState<[number,number]>([0,0])
    const [[startX,startY],setDragStartPoint] = useState<[number,number]>([0,0])

    const [dragging,setDragging] = useState<boolean>(false);
    const [cursorType,setCursorType] = useState<string>('grab');
    const [transformWidth,setTransformWidth] = useState<number>(0);
    const [transformingWidth,setTransformingWidth] = useState<number>(0);
    const [activeIndex,setActiveIndex] = useState<number>(1);


    const [prevBtnStatus,setPrevBtnStatus] = useState<boolean>(false);
    const [nextBtnStatus,setNextBtnStatus] = useState<boolean>(false);
    const [activeTransform,setActiveTransform] = useState<boolean>(false);

    const dataArray = [1,2,3,4,5,6]
    const convertedArray = [dataArray[dataArray.length -1],...dataArray,...dataArray.slice(0,dataArray.length)]
    const componentLength:number = dataArray.length
    const convertedLength:number = convertedArray.length 


    const getContainerData  =()=>{
        if(sliderContainerRef.current){
            // slider container 
            const rect = sliderContainerRef.current.getBoundingClientRect();
            const rectWidth = rect.width
            setContainerWidth(rectWidth);
            const oneComponentWidth = rectWidth / itemsToShow
            setComponentWidth(oneComponentWidth);
            setTransformingWidth(oneComponentWidth)
            setTransformWidth(oneComponentWidth)
            // console.log('Rect Width',oneComponentWidth)
        }


    }



    // console.log('container width',containerWidth)

    window.addEventListener('resize',()=>{
        getContainerData();
    })

    useEffect(()=>{
        getContainerData();
    },[])


    const handleTransformMovement =()=>{
        setTransformWidth(activeIndex * containerWidth)
    }

    // component function
    const handleMouseMove =(event:React.MouseEvent)=>{
        // setMousePosition([event.clientX,event.clientY])
        const {clientX,clientY} = event;
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

    const handleMouseDown =(e:React.MouseEvent<HTMLDivElement>)=>{
        // console.log('Clicked to the element')
        setActiveTransform(false)
        setCursorType('grabbing');
        setDragging(true);
        setDragStartPoint([e.clientX,e.clientY])
        // console.log('drag start points',e.clientX,e.clientY)

    }

    function getNewIndex(activeIndex:number, indexPosition:number) {
        let d = Math.abs(activeIndex - indexPosition); // Difference calculation
    
        if (activeIndex > indexPosition) {
            return d > 1 / 5 ? Math.floor(indexPosition) : activeIndex;
        } else {
            return d > 1 / 5 ? Math.ceil(indexPosition) : activeIndex;
        }
    }

    
    

    const calculateAndTranformWithActiveIndex =(position?:number)=>{
        const unscrolledWidth = componentWidth * convertedLength - transformingWidth
        const indexPosition = convertedLength -  (unscrolledWidth / componentWidth)

        // console.log('unscrolled width',unscrolledWidth)
        // console.log('active index',activeIndex,indexPosition)
        // if(indexPosition < activeIndex/3)
        let absolutePosition = getNewIndex(activeIndex,indexPosition)

        // setActiveIndex(absolutePosition)
        handleActiveIndex(absolutePosition)
    }

    const calculateWidthDots =()=>{

    }

    const handleMouseUp =(e:React.MouseEvent<HTMLDivElement>)=>{
        // console.log('leaved the click event')
        setActiveTransform(true);
        setCursorType('grab');
        setCursorDownPoint([e.clientX,e.clientY])
        // now the active index will be calculated 
        calculateAndTranformWithActiveIndex(e.clientX);
        setDragging(false)
        
    }


    const handleMouseOut =()=>{
        setCursorType('grab');
        setDragging(false);
        
    }


    const sliderComponentStyle:React.CSSProperties = {
        cursor:cursorType,
        width:`${containerWidth * convertedLength}px`,
        transform:`translate3d(-${transformingWidth}px,0px,0px)`,
        transition:activeTransform ? '-webkit-transform 500ms':'',
    }

    const handleActiveIndex =(index:number)=>{
        console.log('index',index)
        setActiveTransform(true)
        let newActiveIndex = index;
        let initialConversion = (newActiveIndex) * componentWidth
        setTransformingWidth(initialConversion)
        setTransformWidth(initialConversion)

        setTimeout(()=>{
            setActiveTransform(false);
            if(index==0){
                newActiveIndex = componentLength
            }else if(index == componentLength+1){
                newActiveIndex = index - componentLength
            }

             initialConversion = (newActiveIndex) * componentWidth
            setTransformingWidth(initialConversion)
            setTransformWidth(initialConversion)
            setActiveIndex(newActiveIndex)
        },200)



        // if(index == componentLength-1){
        //     setNextBtnStatus(true);
        // }else{
        //     setNextBtnStatus(false);
        // }
        // if(index < 1){
        //     setPrevBtnStatus(true);
        // }else{
        //     setPrevBtnStatus(false)
        // }
    }

    const handleDotClick =(index:number)=>{
        // setActiveIndex(index)
        // setTransformingWidth(index * componentWidth)
        handleActiveIndex(index);
    }



    const handlePrevClick =(e:React.MouseEvent)=>{
        if(activeIndex > 0){
            setActiveIndex(activeIndex - 1)
        }
    }
    const handleNextClick =(e:React.MouseEvent)=>{
        if(activeIndex < componentLength-1){
            setActiveIndex(activeIndex + 1)
        }
    }



    useEffect(()=>{

        
    },[])


    // console.log('converted array',convertedArray)
  return (
    <div className='p-2'>
    <p>Slider Carasoul Container</p>
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
            >
            <div 
                className={`carasoul_container h-[30vh] flex`}
                ref={sliderComponentRef}
                style={sliderComponentStyle}
                >
                
                {convertedArray.map((elem,index)=>{
                    return(
                        <div key={index} tabIndex={index-1} className={`p-2 border-slate-600 h-full`} style={{width:`${componentWidth}px`}}>
                            {/* Component {elem} */}
                            <div className='bg-green-300 h-full w-full% flex place-content-center place-items-center'>{elem}
                                <img src={`https://picsum.photos/100?random=${elem}`} alt="" />
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
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
        <div className="dots flex gap-2 place-content-center place-items-center p-2">
            {Array.from({length:componentLength}).map((_,index2)=>(
                <span key={index2} onClick={()=>handleDotClick(index2+1)} className={`h-3 w-3 rounded-full cursor-pointer ${activeIndex == index2+1 ?  'bg-slate-500' : 'bg-slate-200'}`}></span>
            ))}
        </div>
    </div>
    </div>
  )
}

export default CarasoulPage