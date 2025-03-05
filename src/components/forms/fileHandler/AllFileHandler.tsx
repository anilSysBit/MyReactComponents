import React, { useCallback, useState } from 'react';
import { 
    Close as X, 
    CloudUpload as Upload, 
    Description as FileText, 
    Image as ImageIcon, 
    TableChart as FileSpreadsheet, 
    InsertDriveFile as FileIcon, 
    Article as FileTypeIcon 
  } from '@mui/icons-material';
  
import { FileWithPreview, FileHandlerProps, FileType, FILE_TYPE_MAP } from './types';
  
const getFileType = (mimeType: string): FileType => {
  return FILE_TYPE_MAP[mimeType] || 'other';
};

const FilePreviewIcon = ({ type, className }: { type: FileType; className?: string }) => {
  switch (type) {
    case 'image':
      return <ImageIcon className={className} />;
    case 'pdf':
      return <FileText className={className} />;
    case 'excel':
      return <FileSpreadsheet className={className} />;
    case 'word':
      return <FileTypeIcon className={className} />;
    default:
      return <FileIcon className={className} />;
  }
};

export function AllFileHandler({
  onFileSelect,
  maxSizeMB = 10,
  acceptedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  className = '',
}: FileHandlerProps) {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((selectedFile: File) => {
    setError(null);

    // Validate file type
    if (!acceptedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload a supported file.');
      return;
    }

    // Validate file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Create preview for images only
    const fileWithPreview = Object.assign(selectedFile, {
      preview: selectedFile.type.startsWith('image/') 
        ? URL.createObjectURL(selectedFile)
        : undefined,
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

  const fileType = file ? getFileType(file.type) : null;

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
              <p className="text-gray-600">Drag and drop your file here, or</p>
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
            <p className="text-sm text-gray-500">
              Supported files: Images, PDF, Excel, Word
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
              {fileType === 'image' && file.preview ? (
                <img
                  src={file.preview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <FilePreviewIcon type={fileType || 'other'} className="h-16 w-16 text-gray-400" />
                  <p className="text-sm font-medium text-gray-600">{file.name}</p>
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