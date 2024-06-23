package com.ticketex.backend.servicios;

import com.ticketex.backend.modelos.Provincia;

import java.util.List;

public interface ProvinciaService {

    public List<Provincia> obtenerTodas();

    public Provincia crear(Provincia provincia);

    public Provincia obtenerPorId(long id);

    public void eliminar(long id);
}
