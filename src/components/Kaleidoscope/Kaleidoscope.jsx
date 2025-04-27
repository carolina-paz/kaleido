// src/components/Kaleidoscope/Kaleidoscope.jsx
import { useState, useEffect } from 'react';

const COLORS = [
    '#FF6B6B', // Coral
    '#4ECDC4', // Turquesa
    '#45B7D1', // Azul cielo
    '#96CEB4', // Verde menta
    '#FFEEAD', // Amarillo suave
    '#D4A5A5'  // Rosa pálido
  ];
  
const generateRandomPoint = (radius) => {
    const angle = Math.random() * 2 * Math.PI;
    const r = radius *Math.sqrt(Math.random());
    return {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle)
    }
}

const createSymmetricElements = (point, segments = 6) => {
    const elements = [];
    const angleStep = (2 * Math.PI) / segments;
    for (let i = 0; i < segments ; i++) {
        const angle = i * angleStep;
        const x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
        const y = point.x * Math.sin(angle) + point.y * Math.cos(angle);
        elements.push({x, y});
    }
    return elements;
}



  const Kaleidoscope = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
      const basePoint = generateRandomPoint(250);
      const symmetricPoints = createSymmetricElements(basePoint);
      setPoints(symmetricPoints);
    }, []);
    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <svg
          width="600"
          height="600"
          viewBox="-300 -300 600 600"
          style={{
            maxWidth: '90vmin',
            maxHeight: '90vmin',
            
          }}
          
        >
          {/* Aquí irá nuestro caleidoscopio */}
          <circle
          cx="0"
          cy="0"
          r="250"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        { points.map((point, index) => {
            return (
            <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="5"
            fill={COLORS[index % COLORS.length]}
            />
            )
        })}
        </svg>
      </div>
    );
  };
  
export default Kaleidoscope;