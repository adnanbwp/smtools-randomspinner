import React, { useState, useEffect } from 'react';
import SpinWheel from './components/SpinWheel';
import Controls from './components/Controls';
import Results from './components/Results';
import { saveItems, loadItems, clearItems } from './services/localStorageService';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const savedItems = loadItems();
    if (savedItems.length > 0) {
      setItems(savedItems);
    }
  }, []);

  const handleItemsLoaded = (newItems) => {
    setItems(newItems);
    saveItems(newItems);
    setSelectedItem(null);
  };

  const handleSpinComplete = (item) => {
    setSelectedItem(item);
  };

  const handleClearItems = () => {
    setItems([]);
    setSelectedItem(null);
    clearItems(); // This line ensures items are cleared from LocalStorage
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Spin Wheel App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpinWheel items={items} onSpinComplete={handleSpinComplete} />
        <div>
          <Controls onItemsLoaded={handleItemsLoaded} onClearItems={handleClearItems} />
          <Results selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}

export default App;