import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../config/firebase';

const TestFirebase = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const db = getFirestore(app);
        // Intentamos obtener una colección (no importa si existe o no)
        await getDocs(collection(db, 'test'));
        setIsConnected(true);
      } catch (err) {
        setError(err.message);
        setIsConnected(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Firebase Connection Test</h2>
      {isConnected ? (
        <p style={{ color: 'green' }}>✅ Firebase está conectado correctamente!</p>
      ) : (
        <p style={{ color: 'red' }}>❌ Error de conexión: {error}</p>
      )}
    </div>
  );
};

export default TestFirebase;