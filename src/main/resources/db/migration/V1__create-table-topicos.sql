CREATE TABLE topicos (

    id             BIGINT          NOT NULL AUTO_INCREMENT,
    titulo         VARCHAR(200)    NOT NULL,
    mensaje        VARCHAR(1000)   NOT NULL,
    fecha_creacion DATETIME        NOT NULL DEFAULT NOW(),
    status         VARCHAR(50)     NOT NULL DEFAULT 'ABIERTO',
    autor          VARCHAR(100)    NOT NULL,
    curso          VARCHAR(100)    NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uq_topicos_titulo_mensaje (titulo, mensaje(255))
);
