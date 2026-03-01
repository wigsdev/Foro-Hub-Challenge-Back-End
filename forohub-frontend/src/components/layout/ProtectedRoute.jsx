import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    // Si no está autenticado, lo echamos devolviéndolo asincrónicamente a la pantalla de LOGIN
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado, renderizamos la pantalla interna deseada
    return <Outlet />;
};

export default ProtectedRoute;
