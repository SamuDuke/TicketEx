package com.ticketex.backend.controladores;

import com.ticketex.backend.modelos.Categoria;
import com.ticketex.backend.modelos.Entrada;
import com.ticketex.backend.servicios.implementaciones.EntradaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/entrada")
//@CrossOrigin(origins = {"http://localhost/"})
@CrossOrigin(origins = "*")
public class EntradaController {

    @Autowired
    private EntradaServiceImpl entradaService;

    @GetMapping("/listado")
    public List<Entrada> obtenerEntradas(){
        return entradaService.obtenerTodas();
    }

    @PostMapping
    public ResponseEntity<Entrada> guardarEntrada(@RequestBody Entrada entrada){
        Entrada nuevaEnt = entradaService.crear(entrada);
        return new ResponseEntity<>(nuevaEnt, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entrada> obtenerEntradaId(@PathVariable long id){
        Entrada entradaId = entradaService.obtenerPorId(id);
        return ResponseEntity.ok(entradaId);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Entrada> actualizarEntrada(@PathVariable long id, @RequestBody Entrada entrada){
        Entrada entradaId = entradaService.obtenerPorId(id);
        entradaId.setEstado(entrada.getEstado());
        entradaId.setEvento(entrada.getEvento());
        entradaId.setImg(entrada.getImg());
        entradaId.setPrecio(entrada.getPrecio());
        entradaId.setUsuario(entrada.getUsuario());

        Entrada entradaActualizada = entradaService.crear(entradaId);
        return new ResponseEntity<>(entradaActualizada, HttpStatus.CREATED);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<HashMap<String, Boolean>> eliminarEntrada(@PathVariable long id){
        this.entradaService.eliminar(id);
        HashMap<String, Boolean> estadoEntradaEliminada = new HashMap<>();
        estadoEntradaEliminada.put("eliminada", true);
        return ResponseEntity.ok(estadoEntradaEliminada);
    }
}
