package com.ticketex.backend.controladores;

import com.ticketex.backend.modelos.Lugar;
import com.ticketex.backend.servicios.implementaciones.LugarServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/lugar")
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = {"http://localhost/"})
public class LugarController {

    @Autowired
    LugarServiceImpl lugarService;

    @GetMapping("/listado")
    public List<Lugar> obtenerLugares(){
        return lugarService.obtenerTodos();
    }

    @PostMapping
    public ResponseEntity<Lugar> guardarLugar(@RequestBody Lugar lugar){
        Lugar nuevoLugar = lugarService.crear(lugar);
        return new ResponseEntity<>(nuevoLugar, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lugar> obtenerLugarId(@PathVariable long id){
        Lugar lugarId = lugarService.obtenerPorId(id);
        return ResponseEntity.ok(lugarId);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Lugar> actualizarLugar(@PathVariable long id, @RequestBody Lugar lugar){
        Lugar lugarId = lugarService.obtenerPorId(id);
        lugarId.setNombre(lugar.getNombre());
        lugarId.setDireccion(lugar.getDireccion());
        lugarId.setCoordenadax(lugar.getCoordenadax());
        lugarId.setCoordenaday(lugar.getCoordenaday());
        lugarId.setProvincia(lugar.getProvincia());

        Lugar lugarActualizado = lugarService.crear(lugarId);
        return new ResponseEntity<>(lugarActualizado, HttpStatus.CREATED);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<HashMap<String, Boolean>> eliminarLugar(@PathVariable long id){
        this.lugarService.eliminar(id);
        HashMap<String, Boolean> estadoLugarEliminado = new HashMap<>();
        estadoLugarEliminado.put("eliminado", true);
        return ResponseEntity.ok(estadoLugarEliminado);
    }
}
