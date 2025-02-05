import React, { useEffect, useRef, useState } from 'react'
import { Styled } from 'styled-components';

const ScreenLearning:React.FC = () => {
    const scaleRef = useRef<HTMLDivElement | null>(null);
    // const [scales,setScales] = useState<[] | null>(null);
    const [scaleWidth,setScaleWidth] = useState<number>(0);

    function pixelsToCm(pixels:number, ppi = 96) {
        return (pixels / ppi) * 2.54;
    }
    function pixelsToMm(pixels:number,ppi=96):number{
        return (pixels / ppi) * 25.4;
    }
    const mmToPx = (mm: number): number => {
        const MM_TO_PX_RATIO = 3.78; // 1 mm ≈ 3.78 pixels (based on 96 DPI)
        return mm * MM_TO_PX_RATIO;
    };

    const spanStyles:Record<string,React.CSSProperties> = {
        scale_line:{

        }
    }


    const ScaleComponent = ()=>{
        let component:JSX.Element[] = [];
        for (let i = 0; i < scaleWidth; i++) {
            if (i % 10 == 0) {
                component.push(<span key={i} className="scale_line cm" />);
            } else if (i % 5 == 0 || i === 0) {
                component.push(<span key={i} className="scale_line half_cm" />);
            }else{
                component.push(<span key={i} className="scale_line mm" />);

            }
        }

        console.log('components',component)
        return <>{component}</>;
    }

    const comp = ScaleComponent();

    const setScaleMeasurement=()=>{
        if(scaleRef.current){
            const scaleBox = scaleRef.current.getBoundingClientRect()
            const width = scaleBox.width
            const widthInMM:number = pixelsToMm(width)
            setScaleWidth(widthInMM)
        }
    }

    window.addEventListener('resize',(event)=>{
        // console.log(event)
        setScaleMeasurement();
    })

    useEffect(()=>{
        setScaleMeasurement();

    },[])

    
    
  return (
    <div className='component border-2 border-red-500 h-dvh'>
        <div className={`scale`} ref={scaleRef}>
            <ScaleComponent/>
        </div>
    </div>
  )
}

export default ScreenLearning