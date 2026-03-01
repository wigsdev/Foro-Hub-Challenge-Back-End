import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';

// Pantallas placeholder (se desarrollarán en siguientes HU)
const Dashboard = () => <div className="app-container"><div className="glass-panel" style={{ padding: '2rem' }}><h2>Tablero de Tópicos (Área Privada)</h2></div></div>;
const NotFound = () => <div className="app-container"><h2>404 - Ruta no encontrada</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/login" element={<Login />} />

            {/* Rutas Privadas: Evaluadas por ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              {/* Aquí meteremos futuras pantallas topico/:id etc. */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
