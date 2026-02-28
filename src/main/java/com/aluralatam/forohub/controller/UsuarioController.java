package com.aluralatam.forohub.controller;

import com.aluralatam.forohub.domain.usuario.DatosRegistroUsuario;
import com.aluralatam.forohub.domain.usuario.DatosRespuestaUsuario;
import com.aluralatam.forohub.domain.usuario.Usuario;
import com.aluralatam.forohub.domain.usuario.UsuarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/usuarios")
@SecurityRequirement(name = "bearer-key")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    @Transactional
    public ResponseEntity<DatosRespuestaUsuario> registrarUsuario(@RequestBody @Valid DatosRegistroUsuario datos,
            UriComponentsBuilder uriBuilder) {
        // Encriptar la contraseña usando el BCrypt Bean definido en
        // SecurityConfigurations
        String claveEncriptada = passwordEncoder.encode(datos.clave());

        Usuario usuario = usuarioRepository.save(new Usuario(datos.login(), claveEncriptada));
        DatosRespuestaUsuario respuesta = new DatosRespuestaUsuario(usuario);

        URI url = uriBuilder.path("/usuarios/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(url).body(respuesta);
    }

    @GetMapping
    public ResponseEntity<Page<DatosRespuestaUsuario>> listadoUsuarios(
            @PageableDefault(size = 10, sort = "login") Pageable paginacion) {
        return ResponseEntity.ok(usuarioRepository.findAll(paginacion).map(DatosRespuestaUsuario::new));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        var usuario = usuarioRepository.findById(id);
        if (usuario.isPresent()) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
