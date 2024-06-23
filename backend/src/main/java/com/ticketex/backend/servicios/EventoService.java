package com.ticketex.backend.servicios;

import com.ticketex.backend.modelos.Categoria;
import com.ticketex.backend.modelos.Evento;

import java.util.List;

public interface EventoService {

    public List<Evento> obtenerTodos();

    public Evento crear(Evento evento);

    public Evento obtenerPorId(long id);

    public void eliminar(long id);
}
