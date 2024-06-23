package com.ticketex.backend.repositorios;

import com.ticketex.backend.modelos.Entrada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntradaRepo extends JpaRepository<Entrada, Long> {
}
