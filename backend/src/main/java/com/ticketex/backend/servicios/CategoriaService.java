package com.ticketex.backend.servicios;

import com.ticketex.backend.modelos.Categoria;

import java.util.List;

public interface CategoriaService {

    public List<Categoria> obtenerTodas();

    public Categoria crear(Categoria categoria);

    public Categoria obtenerPorId(long id);

    public void eliminar(long id);
}
