package com.ticketex.backend.servicios.implementaciones;

import com.ticketex.backend.modelos.Usuario;
import com.ticketex.backend.repositorios.UsuarioRepo;
import com.ticketex.backend.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Override
    public List<Usuario> obtenerTodos() {
        return usuarioRepo.findAll();
    }

    @Override
    public Usuario crear(Usuario usuario) {
        return usuarioRepo.save(usuario);
    }

    @Override
    public Usuario obtenerPorId(long id) {
        return usuarioRepo.findById(id).orElse(null);
    }

    @Override
    public void eliminar(long id) {
        usuarioRepo.deleteById(id);
    }
}
