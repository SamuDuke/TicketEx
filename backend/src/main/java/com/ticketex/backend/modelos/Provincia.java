package com.ticketex.backend.modelos;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Provincia implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idprovincia;

    private String nombre;
    @ManyToOne
    @JoinColumn(name = "idccaa")
    private CCAA CCAA;

    public Provincia() {
    }

    public Provincia(long idprovincia, String nombre, CCAA CCAA) {
        this.idprovincia = idprovincia;
        this.nombre = nombre;
        this.CCAA = CCAA;
    }

    public long getIdprovincia() {
        return idprovincia;
    }

    public void setIdprovincia(long idprovincia) {
        this.idprovincia = idprovincia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public CCAA getComunidadAutonoma() {
        return CCAA;
    }

    public void setComunidadAutonoma(CCAA CCAA) {
        this.CCAA = CCAA;
    }
}
