import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const SpinWheel = ({ items, onSpinComplete }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#FBCB0A', '#B19CD9', '#FF6B6B'
  ];

  const totalItems = items.length;
  const wheelRadius = 200;
  const centerX = wheelRadius;
  const centerY = wheelRadius;

  const getCoordinatesForPercent = (percent) => {
    const x = centerX + wheelRadius * Math.cos(2 * Math.PI * percent);
    const y = centerY + wheelRadius * Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const newRotation = rotation + 1800 + Math.random() * 720; // 5-7 full rotations
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      const selectedIndex = Math.floor(((360 - (newRotation % 360)) / (360 / totalItems)) % totalItems);
      onSpinComplete(items[selectedIndex]);
    }, 5000);
  };

  const { transform } = useSpring({
    transform: `rotate(${rotation}deg)`,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <div className="spin-wheel">
      <h2 className="text-2xl font-bold mb-4">Spin Wheel</h2>
      <animated.svg 
        width={wheelRadius * 2} 
        height={wheelRadius * 2} 
        viewBox={`0 0 ${wheelRadius * 2} ${wheelRadius * 2}`}
        style={{ transform }}
      >
        {items.map((item, index) => {
          const startPercent = index / totalItems;
          const endPercent = (index + 1) / totalItems;
          
          const [startX, startY] = getCoordinatesForPercent(startPercent);
          const [endX, endY] = getCoordinatesForPercent(endPercent);
          
          const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;
          
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${startX} ${startY}`,
            `A ${wheelRadius} ${wheelRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            'Z'
          ].join(' ');
          
          const middlePercent = (startPercent + endPercent) / 2;
          const [labelX, labelY] = getCoordinatesForPercent(middlePercent);
          const textRotation = (middlePercent * 360 + 90) % 360;

          return (
            <g key={index}>
              <path d={pathData} fill={colors[index % colors.length]} />
              <text
                x={labelX}
                y={labelY}
                dy=".35em"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                transform={`rotate(${textRotation}, ${labelX}, ${labelY})`}
              >
                {item.length > 10 ? item.substr(0, 10) + '...' : item}
              </text>
            </g>
          );
        })}
      </animated.svg>
      <button 
        onClick={spinWheel} 
        disabled={isSpinning}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
};

export default SpinWheel;