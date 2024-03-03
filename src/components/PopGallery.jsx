import React, { useRef } from "react";
import { Button } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Scale,
} from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';

const PopGallery = () => {
  const data = {
    properties: [
      {
        id: 0,
        value:
          "https://th.bing.com/th/id/R.4dc924a9df391d69793d059e986d1d09?rik=JQ8cDeryGq1OHA&pid=ImgRaw&r=0",
      },
      { id: 1, value: "https://picsum.photos/201" },
      { id: 2, value: "https://picsum.photos/202" },
      { id: 3, value: "https://picsum.photos/203" },
      { id: 4, value: "https://picsum.photos/204" },
      { id: 5, value: "https://picsum.photos/205" },
      { id: 6, value: "https://picsum.photos/206" },
      { id: 7, value: "https://picsum.photos/500/900" },
    ],
  };
  const containerRef = useRef();

  const handleScrollNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 500, // Adjust the value as needed
        behavior: "smooth", // Smooth scrolling animation
      });
    }
  };

  // Scroll to the previous position
  const handleScrollPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 500, // Adjust the value as needed
        behavior: "smooth", // Smooth scrolling animation
      });
    }
  };

  return (
    <div className="fix_wrapper">
        <span className="cancel_wrapper"><CancelIcon/></span>
    <div className="pop_gallery_box">
      <div className="pop_gallery_sm">
        <Button className="prev" onClick={handleScrollPrev}>
          <KeyboardDoubleArrowLeft />
        </Button>
        <Button className="next" onClick={handleScrollNext}>
          <KeyboardDoubleArrowRight />
        </Button>
        <div className="img_box" ref={containerRef}>
          {data.properties.map((img,index)=>{
            return(
                <div className="imge">
                    <img src={img.value} alt="" />
                 </div>
            )
          })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default PopGallery;
