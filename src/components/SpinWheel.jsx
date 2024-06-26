import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const SpinWheel = ({ items, onSpinComplete }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelSize, setWheelSize] = useState(400);
  const wheelRef = useRef(null);

  const colors = ['#0015ff', '#ff00a1', '#90fe00', '#8400ff', '#00fff7', '#ff7300'];

  useEffect(() => {
    const handleResize = () => {
      if (wheelRef.current) {
        const containerWidth = wheelRef.current.offsetWidth;
        setWheelSize(Math.min(containerWidth, 600));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add this effect to reset rotation when items change
  useEffect(() => {
    setRotation(0);
  }, [items]);

  const spinWheel = () => {
    if (isSpinning || items.length === 0) return;
    setIsSpinning(true);
    
    const spinDuration = 5000; // 5 seconds
    const minSpins = 5; // Minimum number of full rotations
    const maxSpins = 10; // Maximum number of full rotations
    const anglePerItem = 360 / items.length;
    
    // Calculate total rotation
    const totalSpins = minSpins + Math.random() * (maxSpins - minSpins);
    const extraAngle = Math.floor(Math.random() * items.length) * anglePerItem;
    const totalRotation = totalSpins * 360 + extraAngle;
    
    const newRotation = rotation + totalRotation;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const selectedIndex = items.length - 1 - Math.floor((newRotation % 360) / anglePerItem);
      onSpinComplete(items[selectedIndex]);
    }, spinDuration);
  };

  const { transform } = useSpring({
    transform: `rotate(${rotation}deg)`,
    config: { duration: 5000, easing: t => 1 - Math.pow(1 - t, 4) },
  });

  const createWheel = () => {
    const total = items.length;
    const angleSlice = 360 / total;
    const radius = 1.0;

    return items.map((item, index) => {
      const angle = index * angleSlice;
      const startAngle = angle * (Math.PI / 180);
      const endAngle = (angle + angleSlice) * (Math.PI / 180);

      const startX = radius * Math.cos(startAngle);
      const startY = radius * Math.sin(startAngle);
      const endX = radius * Math.cos(endAngle);
      const endY = radius * Math.sin(endAngle);

      const midAngle = (startAngle + endAngle) / 2;
      const textX = (radius * 0.75) * Math.cos(midAngle);
      const textY = (radius * 0.75) * Math.sin(midAngle);

      const largeArcFlag = angleSlice <= 180 ? "0" : "1";

      const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;

      return (
        <g key={index}>
          <path d={pathData} fill={colors[index % colors.length]} />
          <text
            x={textX}
            y={textY}
            fontSize="0.1"
            fill="white"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={`rotate(${angle + angleSlice / 2}, ${textX}, ${textY})`}
          >
            {item.length > 12 ? `${item.slice(0, 10)}...` : item}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="spin-wheel" ref={wheelRef}>
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No items loaded. Please add items to spin the wheel.
        </div>
      ) : (
        <>
          <div style={{ position: 'relative', width: wheelSize, height: wheelSize }}>
            <animated.svg 
              width={wheelSize} 
              height={wheelSize} 
              viewBox="-1 -1 2 2"
              style={{ transform, transformOrigin: 'center' }}
            >
              {createWheel()}
            </animated.svg>
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                right: '0px',
                transform: 'translateY(-50%)',
                width: '0',
                height: '0',
                borderTop: '20px solid transparent',
                borderBottom: '20px solid transparent',
                borderRight: '30px solid white',
                filter: 'drop-shadow(0px 0px 1px black)',
                zIndex: 10
              }}
            />
          </div>
          <button 
            onClick={spinWheel} 
            disabled={isSpinning}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSpinning ? 'Spinning...' : 'Spin'}
          </button>
        </>
      )}
    </div>
  );
};

export default SpinWheel;