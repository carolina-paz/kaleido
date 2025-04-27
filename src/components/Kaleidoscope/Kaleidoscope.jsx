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

const generateRandomPolygon = (radius, sides = 3) => {
    const points = [];
    const centerAngle = Math.random() * 2 * Math.PI;
    const size = radius * (0.1 + Math.random() * 0.2); // Tamaño aleatorio entre 10% y 30% del radio
    
    for (let i = 0; i < sides; i++) {
        const angle = centerAngle + (i * 2 * Math.PI / sides);
        const x = size * Math.cos(angle);
        const y = size * Math.sin(angle);
        points.push({x, y});
    }
    return points;
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

const createSymmetricPolygons = (polygon, segments = 6) => {
    const polygons = [];
    const angleStep = (2 * Math.PI) / segments;
    
    for (let i = 0; i < segments; i++) {
        const angle = i * angleStep;
        const rotatedPolygon = polygon.map(point => {
            const x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
            const y = point.x * Math.sin(angle) + point.y * Math.cos(angle);
            return {x, y};
        });
        polygons.push(rotatedPolygon);
    }
    return polygons;
}

const Kaleidoscope = () => {
    const [points, setPoints] = useState([]);
    const [polygons, setPolygons] = useState([]);

    useEffect(() => {
      // Generar puntos
      const basePoint = generateRandomPoint(250);
      const symmetricPoints = createSymmetricElements(basePoint);
      setPoints(symmetricPoints);

      // Generar polígonos
      const basePolygon = generateRandomPolygon(250, 3 + Math.floor(Math.random() * 3)); // 3-5 lados
      const symmetricPolygons = createSymmetricPolygons(basePolygon);
      setPolygons(symmetricPolygons);
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
          <circle
            cx="0"
            cy="0"
            r="250"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          {points.map((point, index) => (
            <circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
          {polygons.map((polygon, polygonIndex) => (
            <polygon
              key={`polygon-${polygonIndex}`}
              points={polygon.map(point => `${point.x},${point.y}`).join(' ')}
              fill={COLORS[polygonIndex % COLORS.length]}
              fillOpacity="0.3"
              stroke={COLORS[polygonIndex % COLORS.length]}
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
    );
  };
  
export default Kaleidoscope;