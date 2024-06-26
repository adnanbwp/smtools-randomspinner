import React from 'react';
import { parseCSV } from '../services/csvService';

const Controls = ({ onItemsLoaded, onClearItems }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const items = await parseCSV(file);
        onItemsLoaded(items);
      } catch (error) {
        console.error('Error parsing CSV:', error);
        // TODO: Add user-friendly error handling
      }
    }
  };

  return (
    <div className="controls">
      <h2 className="text-xl font-bold mb-2">Controls</h2>
      <input 
        type="file" 
        accept=".csv" 
        className="mb-2" 
        onChange={handleFileUpload}
      />
      <button 
        onClick={onClearItems}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Clear Items
      </button>
    </div>
  );
};

export default Controls;