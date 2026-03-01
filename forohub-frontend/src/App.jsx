import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewTopic from './pages/NewTopic';
import TopicDetail from './pages/TopicDetail';

// Pantallas placeholder (se desarrollarán en siguientes HU)
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
              <Route path="/topico/nuevo" element={<NewTopic />} />
              <Route path="/topico/:id" element={<TopicDetail />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
