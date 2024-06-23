package com.ticketex.backend.controladores;

import com.ticketex.backend.modelos.Usuario;
import com.ticketex.backend.servicios.implementaciones.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = {"http://localhost/"})
public class UsuarioController {
    @Autowired
    private UsuarioServiceImpl usuarioService;

    @GetMapping("/listado")
    public List<Usuario> obtenerUsuarios(){
        return usuarioService.obtenerTodos();
    }

    @PostMapping
    public ResponseEntity<Usuario> guardarUsuario(@RequestBody Usuario usuario){
        Usuario nuevoUsuario = usuarioService.crear(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioId(@PathVariable long id){
        Usuario usuarioId = usuarioService.obtenerPorId(id);
        return ResponseEntity.ok(usuarioId);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable long id, @RequestBody Usuario usuario){
        Usuario usuarioId = usuarioService.obtenerPorId(id);
        usuarioId.setNombre(usuario.getNombre());
        usuarioId.setApellidos(usuario.getApellidos());
        usuarioId.setCorreo(usuario.getCorreo());
        usuarioId.setContrasena(usuario.getContrasena());
        usuarioId.setFechanacimiento(usuario.getFechanacimiento());
        usuarioId.setTelefono(usuario.getTelefono());
        usuarioId.setCp(usuario.getCp());
        usuarioId.setDireccion(usuario.getDireccion());
        usuarioId.setProvincia(usuario.getProvincia());
        usuarioId.setProvinciafav(usuario.getProvinciafav());

        Usuario usuarioActualizado = usuarioService.crear(usuarioId);
        return new ResponseEntity<>(usuarioActualizado, HttpStatus.CREATED);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<HashMap<String, Boolean>> eliminarUsuario(@PathVariable long id){
        this.usuarioService.eliminar(id);
        HashMap<String, Boolean> estadoUsuarioEliminado = new HashMap<>();
        estadoUsuarioEliminado.put("eliminado", true);
        return ResponseEntity.ok(estadoUsuarioEliminado);
    }
}
