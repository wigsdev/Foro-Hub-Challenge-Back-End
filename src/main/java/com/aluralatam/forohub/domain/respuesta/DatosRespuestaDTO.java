package com.aluralatam.forohub.domain.respuesta;

import java.time.LocalDateTime;

public record DatosRespuestaDTO(
        Long id,
        String mensaje,
        LocalDateTime fechaCreacion,
        Long topicoId,
        String autorNombre) {
    public DatosRespuestaDTO(Respuesta respuesta) {
        this(
                respuesta.getId(),
                respuesta.getMensaje(),
                respuesta.getFechaCreacion(),
                respuesta.getTopico().getId(),
                respuesta.getAutor().getUsername());
    }
}
