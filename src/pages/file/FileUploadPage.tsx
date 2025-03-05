import React, { useState } from 'react';
import type { FileWithPreview } from '../../components/forms/fileHandler/types';
import { ImageFileHandler } from '../../components/forms/fileHandler/ImageFileHandler';
import { AllFileHandler } from '../../components/forms/fileHandler/AllFileHandler';
function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Image File Handler Demo</h1>
        

        <div className="rounded-xl bg-white p-6 shadow-lg">
            <AllFileHandler/>
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
      </div>
    </div>
  );
}

export default FileUploadPage;