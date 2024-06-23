package com.ticketex.backend.servicios.implementaciones;

import com.ticketex.backend.modelos.Entrada;
import com.ticketex.backend.repositorios.EntradaRepo;
import com.ticketex.backend.servicios.EntradaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntradaServiceImpl implements EntradaService {

    @Autowired
    private EntradaRepo entradaRepo;

    @Override
    public List<Entrada> obtenerTodas() {
        return entradaRepo.findAll();
    }

    @Override
    public Entrada crear(Entrada entrada) {
        return entradaRepo.save(entrada);
    }

    @Override
    public Entrada obtenerPorId(long id) {
        return entradaRepo.findById(id).orElse(null);
    }

    @Override
    public void eliminar(long id) {
        entradaRepo.deleteById(id);
    }
}
