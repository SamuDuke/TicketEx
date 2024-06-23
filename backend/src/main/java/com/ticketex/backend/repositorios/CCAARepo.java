package com.ticketex.backend.repositorios;

import com.ticketex.backend.modelos.CCAA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CCAARepo extends JpaRepository<CCAA, Long> {
}
