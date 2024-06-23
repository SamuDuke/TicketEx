package com.ticketex.backend.servicios.implementaciones;

import com.ticketex.backend.modelos.Lugar;
import com.ticketex.backend.repositorios.LugarRepo;
import com.ticketex.backend.servicios.LugarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LugarServiceImpl implements LugarService {

    @Autowired
    private LugarRepo lugarRepo;

    @Override
    public List<Lugar> obtenerTodos() {
        return lugarRepo.findAll();
    }

    @Override
    public Lugar crear(Lugar lugar) {
        return lugarRepo.save(lugar);
    }

    @Override
    public Lugar obtenerPorId(long id) {
        return lugarRepo.findById(id).orElse(null);
    }

    @Override
    public void eliminar(long id) {
        lugarRepo.deleteById(id);
    }
}
