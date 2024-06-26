import React from 'react';

const Results = ({ selectedItem }) => {
  return (
    <div className="results mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Result</h2>
      {selectedItem ? (
        <p className="text-lg">Selected item: <span className="font-bold">{selectedItem}</span></p>
      ) : (
        <p className="text-lg">Spin the wheel to select an item</p>
      )}
    </div>
  );
};

export default Results;