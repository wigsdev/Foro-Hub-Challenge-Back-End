package com.aluralatam.forohub.domain.topico;

import jakarta.validation.constraints.NotNull;

public record DatosActualizarTopico(
        @NotNull(message = "El ID es obligatorio para actualizar") Long id,
        String titulo,
        String mensaje,
        String autor,
        String curso) {
}
