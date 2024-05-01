import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import KrishnaAccordin from './components/KrishnaAccordin'
// import CustomPaging from './components/ThumbnailAccordin'
import "./styles/index.css"
import SliderBox from './components/ThumbnailAccordin'
import ThumbnailAccordin from './components/ThumbnailAccordin'
import PopGallery from './components/PopGallery'
import Chatbox from './components/ChatBox'
import BaseChatBox from './components/BaseChatBox'

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer'

const awsConfig ={
  region:'ap-northeast-1',
    credentials:{
      accessKeyId: 'AKIAU6GD3K63XZUG2E44',
      secretAccessKey: '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',
    }
}

function App() {
  const [count, setCount] = useState(0);
  const [file,setFile] = useState(null);
  const s3 = new S3Client(awsConfig);

  const bucketName = 'jagatpurebazar'
  const key = "images/image"

  const uploadImageToS3 = async (file) => {
    if(file){
      try {
        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: file,
          ContentType: file.type,
        });
  
        await s3.send(command);
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }else{
      console.log('No file')
    }
  };


  useEffect(()=>{
    
  },[])


  const handleClick = async ()=>{
    uploadImageToS3(file);
  }
  const handleChange =(e)=>{
    setFile(e.target.files[0]);
  }

  console.log(file)

  return (
    <>
    <h1>Hello</h1>
    <input type="file" onChange={handleChange}/>
    <button onClick={handleClick}>Click</button>
      {/* <KrishnaAccordin/> */}
      {/* <Chatbox/> */}
      {/* <BaseChatBox/> */}
    </>
  )
}

export default App
