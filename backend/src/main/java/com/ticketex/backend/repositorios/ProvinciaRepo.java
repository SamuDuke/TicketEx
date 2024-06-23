package com.ticketex.backend.repositorios;

import com.ticketex.backend.modelos.Provincia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvinciaRepo extends JpaRepository<Provincia, Long> {
}
