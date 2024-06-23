package com.ticketex.backend.servicios;

import com.ticketex.backend.modelos.Lugar;

import java.util.List;

public interface LugarService {

    public List<Lugar> obtenerTodos();

    public Lugar crear(Lugar lugar);

    public Lugar obtenerPorId(long id);

    public void eliminar(long id);
}
