import React, { useState, useEffect } from 'react';
import SpinWheel from './components/SpinWheel';
import Controls from './components/Controls';
import Results from './components/Results';

function App() {
  const [items, setItems] = useState([]);

  const handleItemsLoaded = (newItems) => {
    setItems(newItems);
    // TODO: Add user feedback for successful upload
  };

  // Add this useEffect hook to log items whenever they change
  useEffect(() => {
    console.log('Current items:', items);
  }, [items]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Spin Wheel App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpinWheel items={items} />
        <div>
          <Controls onItemsLoaded={handleItemsLoaded} />
          <Results />
        </div>
      </div>
    </div>
  );
}

export default App;