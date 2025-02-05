import React, { useState, useRef, MouseEvent } from 'react';

interface ImageMagnifierProps {
  imageSrc: string;
  zoomLevel?: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({ imageSrc, zoomLevel = 2 }) => {
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (imgRef.current && lensRef.current) {
      const { left, top, width, height } = imgRef.current.getBoundingClientRect();
      const xPos = e.clientX - left;
      const yPos = e.clientY - top;

      // Calculate lens position
      setPosition({
        x: (xPos / width) * 100,
        y: (yPos / height) * 100,
      });

      // Adjust lens position (ensure it's within bounds)
      lensRef.current.style.backgroundPosition = `-${(xPos / width) * zoomLevel * 100}% -${(yPos / height) * zoomLevel * 100}%`;
    }
  };

  return (
    <div
      className="magnifier-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt="Image"
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
      />

      {isZooming && (
        <div
          ref={lensRef}
          className="magnifier-lens"
          style={{
            position: 'absolute',
            top: `${position.y}%`,
            left: `${position.x}%`,
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '2px solid #fff',
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition: `-${(position.x / 100) * zoomLevel * 100}% -${(position.y / 100) * zoomLevel * 100}%`,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            backgroundRepeat:"no-repeat"
          }}
        ></div>
      )}
    </div>
  );
};

export default ImageMagnifier;
