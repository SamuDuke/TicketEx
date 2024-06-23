package com.ticketex.backend.modelos;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Entrada implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long identrada;

    private double precio;
    private String estado;
    private String img;
    @ManyToOne
    @JoinColumn(name = "idusuario")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "idevento")
    private Evento evento;

    public Entrada() {
    }

    public Entrada(long identrada, double precio, String estado, String img, Usuario usuario, Evento evento) {
        this.identrada = identrada;
        this.precio = precio;
        this.estado = estado;
        this.img = img;
        this.usuario = usuario;
        this.evento = evento;
    }

    public long getIdentrada() {
        return identrada;
    }

    public void setIdentrada(long identrada) {
        this.identrada = identrada;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
