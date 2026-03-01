import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Intentar inicializar el estado del usuario leyendo el JWT de localStorage
    const [token, setToken] = useState(localStorage.getItem('forohub_jwt'));
    const navigate = useNavigate();

    // Sincronizar estado local con LocalStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem('forohub_jwt', token);
        } else {
            localStorage.removeItem('forohub_jwt');
        }
    }, [token]);

    const login = (jwtData) => {
        setToken(jwtData);
    };

    const logout = () => {
        setToken(null);
        navigate('/login', { replace: true });
    };

    // Estar autenticado significa simplemente tener un token (veremos después su expiración real con la API)
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
