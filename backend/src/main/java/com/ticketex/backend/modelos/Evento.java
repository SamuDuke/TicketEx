package com.ticketex.backend.modelos;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
public class Evento implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idevento;

    private String nombre;
    private LocalDate fecha;
    private String hora;
    private String descripcion;
    private Integer edad;
    private String img;
    @ManyToOne
    @JoinColumn(name = "idcategoria")
    private Categoria categoria;
    @ManyToOne
    @JoinColumn(name = "idlugar")
    private Lugar lugar;

    public Evento() {
    }

    public Evento(long idevento, String nombre, LocalDate fecha, String hora, String descripcion, Integer edad, String img, Categoria categoria, Lugar lugar) {
        this.idevento = idevento;
        this.nombre = nombre;
        this.fecha = fecha;
        this.hora = hora;
        this.descripcion = descripcion;
        this.edad = edad;
        this.img = img;
        this.categoria = categoria;
        this.lugar = lugar;
    }

    public long getIdevento() {
        return idevento;
    }

    public void setIdevento(long idevento) {
        this.idevento = idevento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Lugar getLugar() {
        return lugar;
    }

    public void setLugar(Lugar lugar) {
        this.lugar = lugar;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
