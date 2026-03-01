import { UserCircle2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav style={{ background: 'var(--bg-secondary)', borderBottom: 'var(--glass-border)', padding: '1rem 0' }}>
            <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 32, height: 32, background: 'var(--accent-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        ✨
                    </div>
                    ForoHub PWA
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {isAuthenticated ? (
                        <button onClick={logout} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--accent-color)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <LogOut size={18} />
                            Salir
                        </button>
                    ) : (
                        <Link to="/login" className="btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <UserCircle2 size={18} />
                            Ingresar
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
