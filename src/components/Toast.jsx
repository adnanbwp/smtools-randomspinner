import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose, itemCount }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg`}>
      <div>{message}</div>
      {itemCount !== undefined && (
        <div className="text-sm mt-1">
          {itemCount} item{itemCount !== 1 ? 's' : ''} loaded
        </div>
      )}
    </div>
  );
};

export default Toast;