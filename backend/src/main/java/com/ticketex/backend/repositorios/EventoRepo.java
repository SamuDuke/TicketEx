package com.ticketex.backend.repositorios;

import com.ticketex.backend.modelos.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepo extends JpaRepository<Evento, Long> {

}
