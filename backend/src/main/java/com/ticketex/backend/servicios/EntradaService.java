package com.ticketex.backend.servicios;

import com.ticketex.backend.modelos.Entrada;

import java.util.List;

public interface EntradaService {

    public List<Entrada> obtenerTodas();

    public Entrada crear(Entrada entrada);

    public Entrada obtenerPorId(long id);

    public void eliminar(long id);
}
