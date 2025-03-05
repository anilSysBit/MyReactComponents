import React, { useState } from 'react';
import type { FileWithImagePreview, FileWithPreview } from '../../components/forms/fileHandler/types';
import { ImageFileHandler } from '../../components/forms/fileHandler/ImageFileHandler';
import { FileHandler } from '../../components/forms/fileHandler/AllFileHandler';
function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState<FileWithImagePreview | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[] | null>(null);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Image/File Handler Demo</h1>
        
            <h2>Single Image File</h2>
        <div className="rounded-xl bg-white p-6 shadow-lg">
        <ImageFileHandler
            onFileSelect={setSelectedFile}
            maxSizeMB={5}
          />
          {selectedFile && (
            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <h2 className="text-lg font-semibold text-gray-900">Selected File Info:</h2>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li><strong>Name:</strong> {selectedFile.name}</li>
                <li><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)}MB</li>
                <li><strong>Type:</strong> {selectedFile.type}</li>
              </ul>
            </div>
          )}
        </div>

        <div className="mt-20 rounded-xl bg-white p-6 shadow-lg">
          <h3>Multi Any Files</h3>
        <FileHandler
            onFileSelect={setSelectedFiles}
            maxSizeMB={10}
            isMulti={true}
            maxFiles={6}
          />
           {selectedFiles && selectedFiles.length > 0 && (
            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <h2 className="text-lg font-semibold text-gray-900">Selected Files Info:</h2>
              <div className="mt-2 space-y-2">
                {selectedFiles.map(file => (
                  <div key={file.id} className="rounded bg-white p-3 shadow-sm">
                    <p className="text-sm text-gray-600">
                      <strong>Name:</strong> {file.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)}MB
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Type:</strong> {file.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default FileUploadPage;