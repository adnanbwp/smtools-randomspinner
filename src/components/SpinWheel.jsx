import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const SpinWheel = ({ items, onSpinComplete }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelSize, setWheelSize] = useState(400);
  const wheelRef = useRef(null);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#FBCB0A', '#B19CD9', '#FF6B6B'
  ];

  useEffect(() => {
    const handleResize = () => {
      if (wheelRef.current) {
        const containerWidth = wheelRef.current.offsetWidth;
        setWheelSize(Math.min(containerWidth, 400));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const newRotation = rotation + 1800 + Math.random() * 720; // 5-7 full rotations
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      const selectedIndex = Math.floor(((360 - (newRotation % 360)) / (360 / items.length)) % items.length);
      onSpinComplete(items[selectedIndex]);
    }, 5000);
  };

  const { transform } = useSpring({
    transform: `rotate(${rotation}deg)`,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="spin-wheel" ref={wheelRef}>
      <animated.svg 
        width={wheelSize} 
        height={wheelSize} 
        viewBox="-1 -1 2 2"
        style={{ transform, transformOrigin: 'center' }}
      >
        {items.map((item, index) => {
          const startPercent = index / items.length;
          const endPercent = (index + 1) / items.length;
          
          const [startX, startY] = getCoordinatesForPercent(startPercent);
          const [endX, endY] = getCoordinatesForPercent(endPercent);
          
          const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;
          
          const pathData = [
            `M ${startX} ${startY}`, // Move to start point
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Draw arc
            `L 0 0`, // Line to center
          ].join(' ');
          
          const midPercent = (startPercent + endPercent) / 2;
          const [labelX, labelY] = getCoordinatesForPercent(midPercent);
          const textRotation = (midPercent * 360 + 90) % 360;

          return (
            <g key={index}>
              <path d={pathData} fill={colors[index % colors.length]} />
              <text
                x={labelX * 0.65}
                y={labelY * 0.65}
                dy=".35em"
                textAnchor="middle"
                fill="white"
                fontSize="0.1"
                fontWeight="bold"
                transform={`rotate(${textRotation}, ${labelX * 0.65}, ${labelY * 0.65})`}
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
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
};

export default SpinWheel;