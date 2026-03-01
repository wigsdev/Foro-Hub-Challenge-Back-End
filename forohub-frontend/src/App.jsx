import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

// Pantallas placeholder (se desarrollarán en siguientes HU)
const Dashboard = () => <div className="app-container"><div className="glass-panel" style={{padding: '2rem'}}><h2>Tablero de Tópicos</h2></div></div>;
const Login = () => <div className="app-container"><div className="glass-panel" style={{padding: '2rem'}}><h2>Acceso de Usuarios</h2></div></div>;
const NotFound = () => <div className="app-container"><h2>404 - Ruta no encontrada</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas Protegidas (se implementará el wrapper en HU19) */}
          <Route path="/" element={<Dashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
