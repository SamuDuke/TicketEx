package com.ticketex.backend.modelos;

import jakarta.persistence.*;

@Entity
public class Lugar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idlugar;

    private String nombre;
    private String direccion;
    private String coordenadax;
    private String coordenaday;
    @ManyToOne
    @JoinColumn(name = "idprovincia")
    private Provincia provincia;

    public Lugar() {
    }

    public Lugar(long idlugar, String nombre, String direccion, String coordenadax, String coordenaday, Provincia provincia) {
        this.idlugar = idlugar;
        this.nombre = nombre;
        this.direccion = direccion;
        this.coordenadax = coordenadax;
        this.coordenaday = coordenaday;
        this.provincia = provincia;
    }

    public long getIdlugar() {
        return idlugar;
    }

    public void setIdlugar(long idlugar) {
        this.idlugar = idlugar;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCoordenadax() {
        return coordenadax;
    }

    public void setCoordenadax(String coordenadax) {
        this.coordenadax = coordenadax;
    }

    public String getCoordenaday() {
        return coordenaday;
    }

    public void setCoordenaday(String coordenaday) {
        this.coordenaday = coordenaday;
    }

    public Provincia getProvincia() {
        return provincia;
    }

    public void setProvincia(Provincia provincia) {
        this.provincia = provincia;
    }
}
