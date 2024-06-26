import React from 'react';
import { parseCSV } from '../services/csvService';

const Controls = ({ onItemsLoaded, onClearItems, onError }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const items = await parseCSV(file);
        if (items.length === 0) {
          throw new Error('No valid items found in the CSV file');
        }
        onItemsLoaded(items);
      } catch (error) {
        onError(error);
      }
    }
  };

  return (
    <div className="controls mb-6">
      <h2 className="text-xl font-bold mb-2">Controls</h2>
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="flex-grow">
          <span className="sr-only">Choose CSV file</span>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload}
            className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </label>
        <button 
          onClick={onClearItems}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Clear Items
        </button>
      </div>
    </div>
  );
};

export default Controls;