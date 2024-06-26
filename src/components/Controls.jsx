import React from 'react';
import { parseCSV } from '../services/csvService';

const Controls = ({ onItemsLoaded }) => {
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
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        Spin
      </button>
      <input 
        type="file" 
        accept=".csv" 
        className="mt-2" 
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default Controls;