package com.ticketex.backend.controladores;

import com.ticketex.backend.modelos.Categoria;
import com.ticketex.backend.servicios.implementaciones.CategoriaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/categoria")
//@CrossOrigin(origins = {"http://localhost/"})
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaServiceImpl categoriaService;

    @GetMapping("/listado")
    public List<Categoria> obtenerCategorias() {
        return categoriaService.obtenerTodas();
    }

    @PostMapping
    public ResponseEntity<Categoria> guardarCategoria(@RequestBody Categoria categoria){
        Categoria nuevaCat = categoriaService.crear(categoria);
        return new ResponseEntity<>(nuevaCat, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaId(@PathVariable long id){
        Categoria categoriaId = categoriaService.obtenerPorId(id);
        return ResponseEntity.ok(categoriaId);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable long id, @RequestBody Categoria categoria){
        Categoria categoriaId = categoriaService.obtenerPorId(id);
        categoriaId.setNombre(categoria.getNombre());
        categoriaId.setDescripcion(categoria.getDescripcion());
        categoriaId.setImg(categoria.getImg());

        Categoria categoriaActualizada = categoriaService.crear(categoriaId);
        return new ResponseEntity<>(categoriaActualizada, HttpStatus.CREATED);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<HashMap<String, Boolean>> eliminarCategoria(@PathVariable long id){
        this.categoriaService.eliminar(id);
        HashMap<String, Boolean> estadoCategoriaEliminada = new HashMap<>();
        estadoCategoriaEliminada.put("eliminada", true);
        return ResponseEntity.ok(estadoCategoriaEliminada);
    }
}
