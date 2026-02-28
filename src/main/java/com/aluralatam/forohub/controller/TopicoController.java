package com.aluralatam.forohub.controller;

import com.aluralatam.forohub.domain.topico.DatosRegistroTopico;
import com.aluralatam.forohub.domain.topico.DatosRespuestaTopico;
import com.aluralatam.forohub.domain.topico.Topico;
import com.aluralatam.forohub.domain.topico.TopicoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/topicos")
public class TopicoController {

    @Autowired
    private TopicoRepository topicoRepository;

    @PostMapping
    public ResponseEntity<DatosRespuestaTopico> registrar(
            @RequestBody @Valid DatosRegistroTopico datos,
            UriComponentsBuilder uriBuilder) {

        if (topicoRepository.existsByTituloAndMensaje(datos.titulo(), datos.mensaje())) {
            return ResponseEntity.badRequest().build();
        }

        Topico topico = new Topico(datos);
        topicoRepository.save(topico);

        URI uri = uriBuilder.path("/topicos/{id}").buildAndExpand(topico.getId()).toUri();
        return ResponseEntity.created(uri).body(new DatosRespuestaTopico(topico));
    }

    @GetMapping
    public ResponseEntity<Page<DatosRespuestaTopico>> listadoTopicos(
            @PageableDefault(size = 10, sort = "fechaCreacion") Pageable paginacion) {
        // En un Listado, usamos Page para devolver subconjuntos en formato JSON
        // ordenado y fácil de leer
        return ResponseEntity.ok(topicoRepository.findAll(paginacion).map(DatosRespuestaTopico::new));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatosRespuestaTopico> detallarTopico(@PathVariable Long id) {
        Optional<Topico> topicoEncontrado = topicoRepository.findById(id);

        if (topicoEncontrado.isPresent()) {
            return ResponseEntity.ok(new DatosRespuestaTopico(topicoEncontrado.get()));
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404
        }
    }
}
