package com.ticketex.backend.controladores;

import com.ticketex.backend.modelos.Evento;
import com.ticketex.backend.servicios.implementaciones.EventoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/evento")
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = {"http://localhost/"})
public class EventoController {

    @Autowired
    EventoServiceImpl eventoService;

    @GetMapping("/listado")
    public List<Evento> obtenerEventos(){
        return eventoService.obtenerTodos();
    }

    @PostMapping
    public ResponseEntity<Evento> guardarEvento(@RequestBody Evento evento){
        Evento nuevoEvento = eventoService.crear(evento);
        return new ResponseEntity<>(nuevoEvento, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> obtenerEventoId(@PathVariable long id){
        Evento eventoId = eventoService.obtenerPorId(id);
        return ResponseEntity.ok(eventoId);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Evento> actualizarEvento(@PathVariable long id, @RequestBody Evento evento){
        Evento eventoId = eventoService.obtenerPorId(id);
        eventoId.setNombre(evento.getNombre());
        eventoId.setFecha(evento.getFecha());
        eventoId.setHora(evento.getHora());
        eventoId.setDescripcion(evento.getDescripcion());
        eventoId.setEdad(evento.getEdad());
        eventoId.setImg(evento.getImg());
        eventoId.setCategoria(evento.getCategoria());
        eventoId.setLugar(evento.getLugar());

        Evento eventoActualizado = eventoService.crear(eventoId);
        return new ResponseEntity<>(eventoActualizado, HttpStatus.CREATED);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<HashMap<String, Boolean>> eliminarEvento(@PathVariable long id){
        this.eventoService.eliminar(id);
        HashMap<String, Boolean> estadoEventoEliminado = new HashMap<>();
        estadoEventoEliminado.put("eliminado", true);
        return ResponseEntity.ok(estadoEventoEliminado);
    }
}
