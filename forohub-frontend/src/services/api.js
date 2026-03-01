// url base configurada por defecto a local, en Producción se lee de .env (HU22/24)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const parseResponse = async (res) => {
    if (res.status === 403 || res.status === 401) {
        // Token expirado o inválido: limpiamos storage y disparamos recarga
        localStorage.removeItem('forohub_jwt');
        window.location.href = '/login';
        throw new Error('Sesión expirada o no autorizada.');
    }

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Ocurrió un error en el servidor.');
    }

    // Algunas respuestas (ej. 204 No Content - DELETE) no tienen cuerpo JSON
    if (res.status === 204) return null;

    return res.json();
};

/**
 * Cliente Wrapper para Fetch API.
 * Inyecta automáticamente el token JWT en las cabeceras.
 */
export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('forohub_jwt');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return parseResponse(response);
};
