package com.ticketex.backend.servicios;

import com.ticketex.backend.modelos.CCAA;

import java.util.List;

public interface CCAAService {

    public List<CCAA> obtenerTodas();

    public CCAA crear(CCAA comunidad);

    public CCAA obtenerPorId(long id);

    public void eliminar(long id);
}
