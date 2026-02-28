CREATE TABLE respuestas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mensaje VARCHAR(1000) NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    topico_id BIGINT NOT NULL,
    autor_id BIGINT NOT NULL,
    CONSTRAINT fk_respuestas_topico_id FOREIGN KEY (topico_id) REFERENCES topicos(id) ON DELETE CASCADE,
    CONSTRAINT fk_respuestas_autor_id FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
