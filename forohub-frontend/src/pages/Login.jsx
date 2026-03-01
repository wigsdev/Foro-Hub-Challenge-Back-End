import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import { apiFetch } from '../services/api';

const Login = () => {
    const [loginStr, setLoginStr] = useState('');
    const [clave, setClave] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            const data = await apiFetch('/login', {
                method: 'POST',
                body: JSON.stringify({
                    login: loginStr,
                    clave: clave
                })
            });

            // Éxito: data.jwTtoken contiene la firma enviada por Spring
            login(data.jwTtoken);
            navigate('/');

        } catch (error) {
            setErrorMsg('Credenciales inválidas o servidor inalcanzable.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-panel" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '400px' }}>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--accent-glow)', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                        <LogIn size={28} color="var(--accent-color)" />
                    </div>
                    <h2>Iniciar Sesión</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ingresa a la plataforma y participa en el foro</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Correo Electrónico</label>
                        <input
                            type="email"
                            className="input-base"
                            placeholder="tucorreo@ejemplo.com"
                            value={loginStr}
                            onChange={(e) => setLoginStr(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Contraseña</label>
                        <input
                            type="password"
                            className="input-base"
                            placeholder="••••••••"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            required
                        />
                    </div>

                    {errorMsg && (
                        <div style={{ color: 'var(--danger-color)', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            {errorMsg}
                        </div>
                    )}

                    <button type="submit" className="btn-primary" disabled={isLoading} style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', padding: '0.85rem' }}>
                        {isLoading ? 'Autenticando...' : 'Entrar al Foro'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
