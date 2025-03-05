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
import { FileWithPreview, FileHandlerProps, FileType,FILE_TYPE_MAP } from './types';

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

export function FileHandler({
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
  isMulti = false,
  maxFiles = 10,
}: FileHandlerProps) {  
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback((file: File): FileWithPreview | null => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a supported file.');
      return null;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return null;
    }

    // Create preview for images only
    const fileWithPreview = Object.assign(file, {
      preview: file.type.startsWith('image/') 
        ? URL.createObjectURL(file)
        : undefined,
      id: crypto.randomUUID(),
    });

    return fileWithPreview;
  }, [maxSizeMB, acceptedTypes]);

  const handleFiles = useCallback((newFiles: File[]) => {
    setError(null);

    if (!isMulti && newFiles.length > 1) {
      setError('Only one file can be uploaded at a time');
      return;
    }

    if (isMulti && files.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const processedFiles = newFiles
      .map(processFile)
      .filter((f): f is FileWithPreview => f !== null);

    if (processedFiles.length === 0) return;

    const updatedFiles = isMulti 
      ? [...files, ...processedFiles]
      : processedFiles;

    setFiles(updatedFiles);
    onFileSelect?.(updatedFiles);

    // Simulate upload progress for each file
    processedFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({
          ...prev,
          [file.id]: progress
        }));
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    });
  }, [files, isMulti, maxFiles, processFile, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.length) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, [handleFiles]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFiles(Array.from(e.target.files));
    }
  }, [handleFiles]);
  
  const removeFile = useCallback((fileId: string) => {
    setFiles(prevFiles => {
      const fileToRemove = prevFiles.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      const updatedFiles = prevFiles.filter(f => f.id !== fileId);
      onFileSelect?.(updatedFiles.length > 0 ? updatedFiles : null);
      return updatedFiles;
    });
    setUploadProgress(prev => {
      const { [fileId]: _, ...rest } = prev;
      return rest;
    });
  }, [onFileSelect]);

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
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="w-12 h-12 text-gray-400" />
            <div className="text-center">
              <p className="text-gray-600">
                Drag and drop your file{isMulti ? 's' : ''} here, or
              </p>
              <label className="cursor-pointer text-blue-500 hover:text-blue-600">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept={acceptedTypes.join(',')}
                  onChange={handleChange}
                  multiple={isMulti}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Maximum file size: {maxSizeMB}MB
            </p>
            {isMulti && (
              <p className="text-sm text-gray-500">
                Maximum files: {maxFiles}
              </p>
            )}
            <p className="text-sm text-gray-500">
              Supported files: Images, PDF, Excel, Word
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map(file => {
                const fileType = getFileType(file.type);
                return (
                  <div 
                    key={file.id}
                    className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 p-2"
                  >
                    {fileType === 'image' && file.preview ? (
                      <img
                        src={file.preview}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2">
                        <FilePreviewIcon type={fileType} className="h-12 w-12 text-gray-400" />
                        <p className="text-xs font-medium text-gray-600 text-center line-clamp-2">
                          {file.name}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="absolute right-1 top-1 rounded-full bg-gray-900/50 p-1 text-white hover:bg-gray-900/75"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {uploadProgress[file.id] < 100 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2">
                        <div className="h-1 w-full rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${uploadProgress[file.id]}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {isMulti && files.length < maxFiles && (
                <label className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 p-2 cursor-pointer hover:bg-gray-200 transition-colors">
                  <div className="flex h-full flex-col items-center justify-center gap-2">
                    <Upload className="h-12 w-12 text-gray-400" />
                    <p className="text-xs font-medium text-gray-600 text-center">
                      Add more files
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept={acceptedTypes.join(',')}
                    onChange={handleChange}
                    multiple={isMulti}
                  />
                </label>
              )}
            </div>
          </div>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}