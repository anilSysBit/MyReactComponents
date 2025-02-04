// src/ImageCrop.js
import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const CropContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const CroppedImage = styled.img`
  max-width: 100%;
  margin-top: 20px;
`;

function ImageCrop() {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
    return false; // Return false to prevent automatic aspect ratio cropping
  };

  const onCropComplete = useCallback(async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedUrl = await getCroppedImg(imageRef, crop, 'newFile.jpeg');
      setCroppedImageUrl(croppedUrl);
    }
  }, [imageRef]);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          // Handle the case where blob is null
          reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        const croppedImageUrl = window.URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, 'image/jpeg');
    });
  };

  return (
    <Container>
      <h1>Image Cropper</h1>
      <InputContainer>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </InputContainer>
      {src && (
        <CropContainer>
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
          />
        </CropContainer>
      )}
      {croppedImageUrl && (
        <CroppedImage alt="Cropped Image" src={croppedImageUrl} />
      )}
    </Container>
  );
}

export default ImageCrop;
