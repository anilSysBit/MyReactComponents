import React, { useCallback, useState } from 'react';
// import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Close as X, CloudUpload as Upload, Image as ImageIcon } from '@mui/icons-material';

import { FileWithImagePreview, ImageFileHandlerProps } from './types';

export function ImageFileHandler({
  onFileSelect,
  maxSizeMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = '',
}: ImageFileHandlerProps) {
  const [file, setFile] = useState<FileWithImagePreview | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((selectedFile: File) => {
    setError(null);

    // Validate file type
    if (!acceptedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload an image.');
      return;
    }

    // Validate file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Create preview
    const fileWithPreview = Object.assign(selectedFile, {
      preview: URL.createObjectURL(selectedFile),
    });

    setFile(fileWithPreview);
    onFileSelect?.(fileWithPreview);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  }, [maxSizeMB, acceptedTypes, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const removeFile = useCallback(() => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setUploadProgress(0);
    onFileSelect?.(null);
  }, [file, onFileSelect]);

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${error ? 'border-red-500 bg-red-50' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="w-12 h-12 text-gray-400" />
            <div className="text-center">
              <p className="text-gray-600">Drag and drop your image here, or</p>
              <label className="cursor-pointer text-blue-500 hover:text-blue-600">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept={acceptedTypes.join(',')}
                  onChange={handleChange}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Maximum file size: {maxSizeMB}MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
              {file.preview ? (
                <img
                  src={file.preview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <button
                onClick={removeFile}
                className="absolute right-2 top-2 rounded-full bg-gray-900/50 p-1 text-white hover:bg-gray-900/75"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {uploadProgress < 100 && (
              <div className="w-full">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}