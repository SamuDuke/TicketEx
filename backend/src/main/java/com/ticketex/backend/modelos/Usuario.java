package com.ticketex.backend.modelos;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
public class Usuario implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idusuario;

    private String nombre;
    private String apellidos;
    private String correo;
    private String contrasena;
    private LocalDate fechanacimiento;
    private int telefono;
    private int cp;
    private String direccion;
    @ManyToOne
    @JoinColumn(name = "idprovincia")
    private Provincia provincia;
    @ManyToOne
    @JoinColumn(name = "idprovinciafav")
    private Provincia provinciafav;

    public Usuario() {
    }

    public Usuario(long idusuario, String nombre, String apellidos, String correo, String contrasena, LocalDate fechanacimiento, int telefono, int cp, String direccion, Provincia provincia, Provincia provinciafav) {
        this.idusuario = idusuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contrasena = contrasena;
        this.fechanacimiento = fechanacimiento;
        this.telefono = telefono;
        this.cp = cp;
        this.direccion = direccion;
        this.provincia = provincia;
        this.provinciafav = provinciafav;
    }

    public long getIdusuario() {
        return idusuario;
    }

    public void setIdusuario(long idusuario) {
        this.idusuario = idusuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public LocalDate getFechanacimiento() {
        return fechanacimiento;
    }

    public void setFechanacimiento(LocalDate fechanacimiento) {
        this.fechanacimiento = fechanacimiento;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public int getCp() {
        return cp;
    }

    public void setCp(int cp) {
        this.cp = cp;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Provincia getProvincia() {
        return provincia;
    }

    public void setProvincia(Provincia provincia) {
        this.provincia = provincia;
    }

    public Provincia getProvinciafav() {
        return provinciafav;
    }

    public void setProvinciafav(Provincia provinciafav) {
        this.provinciafav = provinciafav;
    }
}
