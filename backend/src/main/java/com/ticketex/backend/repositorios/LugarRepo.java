package com.ticketex.backend.repositorios;

import com.ticketex.backend.modelos.Lugar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LugarRepo extends JpaRepository<Lugar,Long> {
}
