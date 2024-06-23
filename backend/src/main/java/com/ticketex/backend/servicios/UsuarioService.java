package com.ticketex.backend.servicios;

import com.ticketex.backend.modelos.Categoria;
import com.ticketex.backend.modelos.Usuario;

import java.util.List;

public interface UsuarioService {

    public List<Usuario> obtenerTodos();

    public Usuario crear(Usuario usuario);

    public Usuario obtenerPorId(long id);

    public void eliminar(long id);
}
