import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import { PenSquare } from 'lucide-react';

const NewTopic = () => {
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [nombreCurso, setNombreCurso] = useState('Spring Boot 3'); // Hardcode temporal

    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            await apiFetch('/topicos', {
                method: 'POST',
                body: JSON.stringify({
                    titulo,
                    mensaje,
                    autor: 'admin@aluracursos.com', // El Backend espera @NotBlank String autor
                    curso: nombreCurso              // El Backend espera @NotBlank String curso
                })
            });

            // Éxito: volvemos al dashboard
            navigate('/');

        } catch (error) {
            setErrorMsg(error.message || 'Error al crear el tópico. Revisa si ya existe uno igual.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app-container" style={{ maxWidth: '800px' }}>
            <div className="glass-panel" style={{ padding: '3rem 2rem' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--accent-glow)', width: 48, height: 48, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PenSquare size={24} color="var(--accent-color)" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0 }}>Crear Nuevo Tópico</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Inicia una nueva discusión en el foro</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Curso Relacionado</label>
                        <select
                            className="input-base"
                            value={nombreCurso}
                            onChange={(e) => setNombreCurso(e.target.value)}
                            style={{ cursor: 'pointer', appearance: 'none', backgroundColor: 'var(--bg-secondary)' }}
                        >
                            <option value="Servidores Node.js">Servidores Node.js</option>
                            <option value="Spring Boot 3">Avanzando con Spring Boot 3</option>
                            <option value="React y Vite">Ecosistema Frontend React</option>
                            <option value="General">General / Off-topic</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Título de tu duda</label>
                        <input
                            type="text"
                            className="input-base"
                            placeholder="Ej. Error 404 al configurar mi RestController"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            minLength={5}
                            maxLength={100}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Detalla tu problema</label>
                        <textarea
                            className="input-base"
                            placeholder="Describe qué intentabas hacer, qué código usaste y qué respuesta te dio el servidor..."
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            required
                            rows={8}
                            style={{ resize: 'vertical' }}
                            minLength={10}
                        />
                    </div>

                    {errorMsg && (
                        <div style={{ color: 'var(--danger-color)', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            {errorMsg}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => navigate('/')} className="btn-primary" style={{ background: 'transparent', color: 'var(--text-secondary)', boxShadow: 'none' }}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary" disabled={isLoading} style={{ minWidth: '150px' }}>
                            {isLoading ? 'Publicando...' : 'Publicar Tópico'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTopic;
