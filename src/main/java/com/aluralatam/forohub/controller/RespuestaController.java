package com.aluralatam.forohub.controller;

import com.aluralatam.forohub.domain.respuesta.*;
import com.aluralatam.forohub.domain.topico.TopicoRepository;
import com.aluralatam.forohub.domain.usuario.UsuarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/respuestas")
@SecurityRequirement(name = "bearer-key")
public class RespuestaController {

    @Autowired
    private RespuestaRepository respuestaRepository;

    @Autowired
    private TopicoRepository topicoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<DatosRespuestaDTO> registrarRespuesta(@RequestBody @Valid DatosRegistroRespuesta datos,
            UriComponentsBuilder uriBuilder) {
        var topico = topicoRepository.findById(datos.topicoId());
        var autor = usuarioRepository.findById(datos.autorId());

        if (topico.isEmpty() || autor.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Respuesta respuesta = respuestaRepository.save(new Respuesta(datos, topico.get(), autor.get()));

        DatosRespuestaDTO respuestaDTO = new DatosRespuestaDTO(respuesta);
        URI url = uriBuilder.path("/respuestas/{id}").buildAndExpand(respuesta.getId()).toUri();
        return ResponseEntity.created(url).body(respuestaDTO);
    }

    @GetMapping
    public ResponseEntity<Page<DatosRespuestaDTO>> listadoRespuestas(
            @PageableDefault(size = 10, sort = "fechaCreacion") Pageable paginacion) {
        return ResponseEntity.ok(respuestaRepository.findAll(paginacion).map(DatosRespuestaDTO::new));
    }

    @GetMapping("/topico/{topicoId}")
    public ResponseEntity<Page<DatosRespuestaDTO>> respuestasPorTopico(@PathVariable Long topicoId,
            @PageableDefault(size = 10, sort = "fechaCreacion") Pageable paginacion) {
        return ResponseEntity.ok(respuestaRepository.findByTopicoId(topicoId, paginacion).map(DatosRespuestaDTO::new));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatosRespuestaDTO> detallarRespuesta(@PathVariable Long id) {
        var respuesta = respuestaRepository.findById(id);
        if (respuesta.isPresent()) {
            return ResponseEntity.ok(new DatosRespuestaDTO(respuesta.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DatosRespuestaDTO> actualizarRespuesta(@RequestBody @Valid DatosActualizarRespuesta datos) {
        var respuesta = respuestaRepository.getReferenceById(datos.id());
        respuesta.actualizarDatos(datos);
        return ResponseEntity.ok(new DatosRespuestaDTO(respuesta));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> eliminarRespuesta(@PathVariable Long id) {
        var respuesta = respuestaRepository.findById(id);
        if (respuesta.isPresent()) {
            respuestaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
