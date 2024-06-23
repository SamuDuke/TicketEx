package com.ticketex.backend.controladores;

import com.ticketex.backend.modelos.Provincia;
import com.ticketex.backend.servicios.implementaciones.ProvinciaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/provincia")
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = {"http://localhost/"})
public class ProvinciaController {
    @Autowired
    ProvinciaServiceImpl provinciaService;

    @GetMapping("/listado")
    public List<Provincia> obtenerProvincias(){
        return provinciaService.obtenerTodas();
    }

    @PostMapping
    public ResponseEntity<Provincia> guardarProvincia(@RequestBody Provincia provincia){
        Provincia nuevaProvincia = provinciaService.crear(provincia);
        return new ResponseEntity<>(nuevaProvincia, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Provincia> obtenerProvinciaId(@PathVariable long id){
        Provincia provinciaId = provinciaService.obtenerPorId(id);
        return ResponseEntity.ok(provinciaId);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Provincia> actualizarProvincia(@PathVariable long id, @RequestBody Provincia provincia){
        Provincia provinciaId = provinciaService.obtenerPorId(id);
        provinciaId.setNombre(provincia.getNombre());
        provinciaId.setComunidadAutonoma(provincia.getComunidadAutonoma());

        Provincia provinciaActualizada = provinciaService.crear(provinciaId);
        return new ResponseEntity<>(provinciaActualizada, HttpStatus.CREATED);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<HashMap<String, Boolean>> eliminarProvincia(@PathVariable long id){
        this.provinciaService.eliminar(id);
        HashMap<String, Boolean> estadoProvinciaEliminada = new HashMap<>();
        estadoProvinciaEliminada.put("eliminada", true);
        return ResponseEntity.ok(estadoProvinciaEliminada);
    }
}
