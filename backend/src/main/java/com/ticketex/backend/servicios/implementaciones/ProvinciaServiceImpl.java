package com.ticketex.backend.servicios.implementaciones;

import com.ticketex.backend.modelos.Provincia;
import com.ticketex.backend.repositorios.ProvinciaRepo;
import com.ticketex.backend.servicios.ProvinciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinciaServiceImpl implements ProvinciaService {

    @Autowired
    private ProvinciaRepo provinciaRepo;

    @Override
    public List<Provincia> obtenerTodas() {
        return provinciaRepo.findAll();
    }

    @Override
    public Provincia crear(Provincia provincia) {
        return provinciaRepo.save(provincia);
    }

    @Override
    public Provincia obtenerPorId(long id) {
        return provinciaRepo.findById(id).orElse(null);
    }

    @Override
    public void eliminar(long id) {
        provinciaRepo.deleteById(id);
    }
}
