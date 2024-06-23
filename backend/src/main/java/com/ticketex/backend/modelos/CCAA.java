package com.ticketex.backend.modelos;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;

@Entity
public class CCAA implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idccaa;

    private String nombre;

    public CCAA() {
    }

    public CCAA(int idccaa, String nombre) {
        this.idccaa = idccaa;
        this.nombre = nombre;
    }

    public long getIdccaa() {
        return idccaa;
    }

    public void setIdccaa(long idccaa) {
        this.idccaa = idccaa;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
