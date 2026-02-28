package com.aluralatam.forohub.domain.usuario;

public record DatosRespuestaUsuario(
        Long id,
        String login) {
    public DatosRespuestaUsuario(Usuario usuario) {
        this(usuario.getId(), usuario.getLogin());
    }
}
