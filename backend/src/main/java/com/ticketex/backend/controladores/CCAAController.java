package com.ticketex.backend.controladores;

import com.ticketex.backend.modelos.CCAA;
import com.ticketex.backend.servicios.implementaciones.CCAAServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/ccaa")
//@CrossOrigin(origins = {"http://localhost/"})
@CrossOrigin(origins = "*")
public class CCAAController {

    @Autowired
    CCAAServiceImpl comunidadAutonomaService;

    @GetMapping("/listado")
    public List<CCAA> obtenerComunidadAutonomas(){
        return comunidadAutonomaService.obtenerTodas();
    }

    @PostMapping
    public ResponseEntity<CCAA> guardarComunidad(@RequestBody CCAA comunidad){
        CCAA nuevaCCAA = comunidadAutonomaService.crear(comunidad);
        return new ResponseEntity<>(nuevaCCAA, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CCAA> obtenerComunidadId(@PathVariable long id){
        CCAA comunidadId = comunidadAutonomaService.obtenerPorId(id);
        return ResponseEntity.ok(comunidadId);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<CCAA> actualizarComunidad(@PathVariable long id, @RequestBody CCAA comunidad){
        CCAA comunidadId = comunidadAutonomaService.obtenerPorId(id);
        comunidadId.setNombre(comunidad.getNombre());

        CCAA comunidadActualizada = comunidadAutonomaService.crear(comunidadId);
        return new ResponseEntity<>(comunidadActualizada, HttpStatus.CREATED);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<HashMap<String, Boolean>> eliminarComunidad(@PathVariable long id){
        this.comunidadAutonomaService.eliminar(id);
        HashMap<String, Boolean> estadoComunidadEliminada = new HashMap<>();
        estadoComunidadEliminada.put("eliminada", true);
        return ResponseEntity.ok(estadoComunidadEliminada);
    }
}
