import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import { MessageSquare, Calendar, ArrowLeft, Trash2, User } from 'lucide-react';

const TopicDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [topico, setTopico] = useState(null);
    const [respuestas, setRespuestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                // Ejecutando peticiones paralelas: /topicos/:id y /respuestas/topico/:id (HU16)
                const [topicoData, respuestasData] = await Promise.all([
                    apiFetch(`/topicos/${id}`),
                    apiFetch(`/respuestas/topico/${id}`)
                ]);

                setTopico(topicoData);
                setRespuestas(respuestasData.content || []);
            } catch (error) {
                setErrorMsg('No se pudo cargar el tópico. Quizás fue eliminado.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de eliminar este tópico?')) return;

        try {
            await apiFetch(`/topicos/${id}`, { method: 'DELETE' });
            navigate('/'); // Redirigir al inicio tras borrar
        } catch (error) {
            alert('Error al eliminar: ' + error.message);
        }
    };

    if (loading) return <div className="app-container"><p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Cargando tópico...</p></div>;

    if (errorMsg) return (
        <div className="app-container" style={{ textAlign: 'center' }}>
            <h2>{errorMsg}</h2>
            <button onClick={() => navigate('/')} className="btn-primary" style={{ marginTop: '1rem' }}>Volver al Tablero</button>
        </div>
    );

    return (
        <div className="app-container" style={{ maxWidth: '900px' }}>
            <button
                onClick={() => navigate('/')}
                className="btn-primary"
                style={{ background: 'transparent', color: 'var(--text-secondary)', padding: '0', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', boxShadow: 'none' }}
            >
                <ArrowLeft size={18} /> Volver
            </button>

            {/* Cabecera del Tópico */}
            <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h1 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)', fontSize: '2rem', lineHeight: 1.2 }}>
                        {topico.titulo}
                    </h1>
                    <button onClick={handleDelete} title="Eliminar Tópico" style={{ background: 'transparent', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', transition: 'background 0.2s' }}>
                        <Trash2 size={20} />
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={16} /> Autor ID {topico.autor_id}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={16} /> {new Date(topico.fechaCreacion).toLocaleString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'white' }}>{topico.nombreCurso}</span>
                </div>

                <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    {topico.mensaje}
                </p>
            </div>

            {/* Sección de Respuestas (HU 16) */}
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={20} color="var(--accent-color)" />
                Respuestas ({respuestas.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {respuestas.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px' }}>
                        Nadie ha respondido a este tópico aún.
                    </p>
                ) : (
                    respuestas.map(r => (
                        <div key={r.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <span style={{ fontWeight: 600, color: 'var(--accent-color)' }}>Usuario ID: {r.autorId}</span>
                                <span>{new Date(r.fechaCreacion).toLocaleString()}</span>
                            </div>
                            <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{r.mensaje}</p>
                        </div>
                    ))
                )}
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px dashed var(--bg-tertiary)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>La creación de Respuestas continuará en futuras versiones (Próxima HU).</p>
            </div>
        </div>
    );
};

export default TopicDetail;
