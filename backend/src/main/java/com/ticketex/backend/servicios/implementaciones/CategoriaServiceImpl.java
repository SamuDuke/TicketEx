package com.ticketex.backend.servicios.implementaciones;

import com.ticketex.backend.modelos.Categoria;
import com.ticketex.backend.repositorios.CategoriaRepo;
import com.ticketex.backend.servicios.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoriaRepo categoriaRepo;

    @Override
    public List<Categoria> obtenerTodas() {
        return categoriaRepo.findAll();
    }

    @Override
    public Categoria crear(Categoria categoria) {
        return categoriaRepo.save(categoria);
    }

    @Override
    public Categoria obtenerPorId(long id) {
        return categoriaRepo.findById(id).orElse(null);
    }

    @Override
    public void eliminar(long id) {
        categoriaRepo.deleteById(id);
    }
}
