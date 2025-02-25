import React, { useState } from 'react';
import AnilCarasoul from '../components/carasoul/AnilCarasoul';
import CarasoulProps from '../components/carasoul/carasoulType';

const CarasoulPage = () => {
    const [settings, setSettings] = useState<CarasoulProps>({
        itemsToShow: 2,
        itemToScroll: 1,
        arrows: false,
        dots: true,
    });

    return (
        <div>
            {/* User Controls */}
            <div className="p-4 bg-gray-100 rounded-md shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-2">Carousel Settings</h2>
                <label className="block mb-2">
                    Items to Show:
                    <input 
                        type="number" 
                        value={settings.itemsToShow} 
                        onChange={(e) => setSettings({ ...settings, itemsToShow: Number(e.target.value) })} 
                        className="ml-2 p-1 border rounded"
                        min={1}
                    />
                </label>

                <label className="block mb-2">
                    Items to Scroll:
                    <input 
                        type="number" 
                        value={settings.itemToScroll} 
                        onChange={(e) => setSettings({ ...settings, itemToScroll: Number(e.target.value) })} 
                        className="ml-2 p-1 border rounded"
                        min={1}
                    />
                </label>

                <label className="block mb-2">
                    <input 
                        type="checkbox" 
                        checked={settings.arrows} 
                        onChange={(e) => setSettings({ ...settings, arrows: e.target.checked })} 
                        className="mr-2"
                    />
                    Show Arrows
                </label>

                <label className="block mb-2">
                    <input 
                        type="checkbox" 
                        checked={settings.dots} 
                        onChange={(e) => setSettings({ ...settings, dots: e.target.checked })} 
                        className="mr-2"
                    />
                    Show Dots
                </label>
            </div>

            {/* Carousel */}
            <AnilCarasoul {...settings}>
                {[1, 2, 3, 4, 5, 6].map((elem) => (
                    <div key={elem} className='bg-green-300 h-full w-full flex place-content-center place-items-center'>
                        {elem}
                        <img src={`https://picsum.photos/100?random=${elem}`} alt={`Slide ${elem}`} />
                    </div>
                ))}
            </AnilCarasoul>
        </div>
    );
};

export default CarasoulPage;
