import React from 'react';

const Results = ({ selectedItem }) => {
  return (
    <div className="results mt-4">
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