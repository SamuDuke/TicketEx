package com.ticketex.backend.servicios.implementaciones;

import com.ticketex.backend.modelos.CCAA;
import com.ticketex.backend.repositorios.CCAARepo;
import com.ticketex.backend.servicios.CCAAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CCAAServiceImpl implements CCAAService {
    @Autowired
    CCAARepo CCAARepo;

    @Override
    public List<CCAA> obtenerTodas() {
        return CCAARepo.findAll();
    }

    @Override
    public CCAA crear(CCAA comunidad) {
        return CCAARepo.save(comunidad);
    }

    @Override
    public CCAA obtenerPorId(long id) {
        return CCAARepo.findById(id).orElse(null);
    }

    @Override
    public void eliminar(long id) {
        CCAARepo.deleteById(id);
    }
}
