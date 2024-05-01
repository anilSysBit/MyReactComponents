import React from 'react'
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3'

const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/jfif'
]



const S3BucketUpload = async(file) => {
    const S3_BUCKET = 'jagatpurebazar'
    const REGION = 'ap-northeast-1'

    AWS.config.update({
        accessKeyId:'AKIAU6GD3K63XZUG2E44',
        secretAccessKey:"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",
    });

    const s3 = new S3({
        params:{Bucket: S3_BUCKET},
        region:REGION,
    });

    const params = {
        Bucket: S3_BUCKET,
        key:file.name,
        Body:file,
    }

    try {
        const upload = await s3.putObject(params).promise();
        console.log(upload);
        alert("File uploaded successfully.");
  
      } catch (error) {
        console.error(error);
        alert("Error uploading file: " + error.message); // Inform user about the error
      }

}

export default S3BucketUpload