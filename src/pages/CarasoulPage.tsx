import React, { useEffect, useRef, useState } from 'react'

interface CarasoulProps{
    itemsToShow?:number;
}

const CarasoulPage:React.FC<CarasoulProps> = ({
    itemsToShow=1

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
    const [activeIndex,setActiveIndex] = useState<number>(0);


    const componentLength:number = 10;


    const getContainerData  =()=>{
        if(sliderContainerRef.current){
            // slider container 
            const rect = sliderContainerRef.current.getBoundingClientRect();
            const rectWidth = rect.width
            setContainerWidth(rectWidth);
            const oneComponentWidth = rectWidth / itemsToShow
            setComponentWidth(oneComponentWidth);
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

            if(newCalculatedWidth > componentWidth * (componentLength - 1)){
                console.log('excedding')
                setTransformingWidth(componentWidth * (componentLength - 1))
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
        setCursorType('grabbing');
        setDragging(true);
        setDragStartPoint([e.clientX,e.clientY])
        // console.log('drag start points',e.clientX,e.clientY)

    }

    const calculateAndTranformWithActiveIndex =()=>{
        const indexPosition = 10 - Math.round((componentWidth * 10 - transformingWidth)/componentWidth)
        console.log('Active Index',indexPosition)
        setTransformingWidth(indexPosition * componentWidth)
        setTransformWidth(indexPosition * componentWidth)
    }

    const handleMouseUp =(e:React.MouseEvent<HTMLDivElement>)=>{
        // console.log('leaved the click event')
        setCursorType('grab');
        setCursorDownPoint([e.clientX,e.clientY])
        calculateAndTranformWithActiveIndex();
        setDragging(false)
        
    }


    const handleMouseOut =()=>{
        setCursorType('grab');
        setDragging(false);
        
    }


    const sliderComponentStyle:React.CSSProperties = {
        cursor:cursorType,
        width:`${containerWidth * 10}px`,
        transform:`translate3d(-${transformingWidth}px,0px,0px)`,
        transition:!dragging ? '-webkit-transform 500ms':''
    }

  return (
    <div className="carasoul_page p-10">
        <p>Slider Carasoul Container</p>
        <div 
            className="carasoul-main-container overflow-hidden  relative transition-transform" 
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
                {[1,2,3,4,5,6,7,8,9,10].map((elem,index)=>{
                    return(
                        <div key={index} tabIndex={index} className={`border-2 border-slate-600 h-full flex place-content-center place-items-center`} style={{width:`${componentWidth}px`}}>
                            Component {elem}
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default CarasoulPage