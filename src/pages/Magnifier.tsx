import React, { useState } from 'react';
import AnilMagnifier from '../components/magnifier/AnilMagnifier';

const Magnifier = () => {
    // const [image, setImage] = useState('https://picsum.photos/200/200');
    const [image, setImage] = useState('https://i.redd.it/zziah8ln4ttb1.jpg');
    const [width, setWidth] = useState(350);
    const [height, setHeight] = useState(400);
    const [previewMultiple, setPreviewMultiple] = useState(1);
    const [zaliMultiple, setZaliMultiple] = useState(1);

    return (
        <div className="p-4">
            {/* Settings Panel */}
            <div className="p-4 bg-gray-100 rounded-md shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-2">Magnifier Settings</h2>

                <label className="block mb-2">
                    Image URL:
                    <input 
                        type="text" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)} 
                        className="ml-2 p-1 border rounded w-full"
                    />
                </label>

                <label className="block mb-2">
                    Width:
                    <input 
                        type="number" 
                        value={width} 
                        onChange={(e) => setWidth(Number(e.target.value))} 
                        className="ml-2 p-1 border rounded"
                    />
                </label>

                <label className="block mb-2">
                    Height:
                    <input 
                        type="number" 
                        value={height} 
                        onChange={(e) => setHeight(Number(e.target.value))} 
                        className="ml-2 p-1 border rounded"
                    />
                </label>

                <label className="block mb-2">
                    Preview Multiple:
                    <input 
                        type="number" 
                        value={previewMultiple} 
                        step="0.1"
                        onChange={(e) => setPreviewMultiple(Number(e.target.value))} 
                        className="ml-2 p-1 border rounded"
                    />
                </label>

                <label className="block mb-2">
                    Zoom Multiple:
                    <input 
                        type="number" 
                        value={zaliMultiple} 
                        step="0.1"
                        onChange={(e) => setZaliMultiple(Number(e.target.value))} 
                        className="ml-2 p-1 border rounded"
                    />
                </label>
            </div>

            {/* Magnifier Component */}
            <AnilMagnifier
                image={image}
                width={width}
                height={height}
                previewMultiple={previewMultiple}
                zaliMultiple={zaliMultiple}
            />
        </div>
    );
};

export default Magnifier;
