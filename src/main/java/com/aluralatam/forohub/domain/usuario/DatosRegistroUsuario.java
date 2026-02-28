package com.aluralatam.forohub.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DatosRegistroUsuario(
        @NotBlank @Email String login,
        @NotBlank @Size(min = 6) String clave) {
}
