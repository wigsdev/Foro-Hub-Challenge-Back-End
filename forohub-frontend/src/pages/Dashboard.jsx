import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import { MessageSquare, Calendar, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    const [topicos, setTopicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTopicos = async () => {
            try {
                // Petición GET al Backend (Spring Data Pagination default: 10/page)
                const data = await apiFetch('/topicos');
                setTopicos(data.content || []);
            } catch (error) {
                console.error("Error obteniendo los tópicos:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTopicos();
    }, []);

    if (loading) return <div className="app-container"><p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Cargando tópicos...</p></div>;

    return (
        <div className="app-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Últimos Tópicos Discutidos</h2>
                <button onClick={() => navigate('/topico/nuevo')} className="btn-primary">Nuevo Tópico</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {topicos.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <MessageSquare size={48} style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
                        <h3>Aún no hay tópicos.</h3>
                        <p>¡Sé el primero en iniciar la conversación!</p>
                    </div>
                ) : (
                    topicos.map(topico => (
                        <div
                            key={topico.id}
                            onClick={() => navigate(`/topico/${topico.id}`)}
                            className="glass-panel"
                            style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}
                        >
                            <div>
                                <h3 style={{ marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{topico.titulo}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {topico.mensaje}
                                </p>
                                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <MessageSquare size={14} /> Curso: {topico.nombreCurso}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Calendar size={14} /> {new Date(topico.fechaCreacion).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <ChevronRight color="var(--accent-color)" opacity={0.5} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
