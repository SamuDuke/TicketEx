package com.ticketex.backend.servicios.implementaciones;

import com.ticketex.backend.modelos.Evento;
import com.ticketex.backend.repositorios.EventoRepo;
import com.ticketex.backend.servicios.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoServiceImpl implements EventoService {

    @Autowired
    private EventoRepo eventoRepo;

    @Override
    public List<Evento> obtenerTodos() {
        return eventoRepo.findAll();
    }

    @Override
    public Evento crear(Evento evento) {
        return eventoRepo.save(evento);
    }

    @Override
    public Evento obtenerPorId(long id) {
        return eventoRepo.findById(id).orElse(null);
    }

    @Override
    public void eliminar(long id) {
        eventoRepo.deleteById(id);
    }
}
