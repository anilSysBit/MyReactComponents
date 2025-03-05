export interface FileWithImagePreview extends File {
  preview?: string;
}
  
  export interface ImageFileHandlerProps {
    onFileSelect?: (file: FileWithPreview | null) => void;
    maxSizeMB?: number;
    acceptedTypes?: string[];
    className?: string;
  }

  export interface FileWithPreview extends File {
    preview?: string;
    id: string; // Unique identifier for each file
  }
  
  export type FileType = 'image' | 'pdf' | 'excel' | 'word' | 'other';
  
  export interface FileHandlerProps {
    onFileSelect?: (files: FileWithPreview[] | null) => void;
    maxSizeMB?: number;
    acceptedTypes?: string[];
    className?: string;
    isMulti?: boolean;
    maxFiles?: number;
  }
  
  export const FILE_TYPE_MAP: Record<string, FileType> = {
    'image/jpeg': 'image',
    'image/png': 'image',
    'image/webp': 'image',
    'image/gif': 'image',
    'application/pdf': 'pdf',
    'application/vnd.ms-excel': 'excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',
    'application/msword': 'word',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word'
  };