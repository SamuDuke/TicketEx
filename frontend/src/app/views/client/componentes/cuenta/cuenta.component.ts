import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ProvinciaService } from '../../../../servicios/provincia.service';
import { UsuarioService } from '../../../../servicios/usuario.service';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})
export class CuentaComponent {

  @Input() usuario: any
  @Output() entradas = new EventEmitter<string>();
  provincias: any
  formularioCiudadFav = new FormGroup({
    ciudad: new FormControl('')
  });

  constructor(private provinciaService: ProvinciaService, private router: Router, private usuarioService: UsuarioService) {
    this.provinciaService.listarProvincias().subscribe((result: any) => {
      this.provincias = result
    })
  }

  navegarEntradas() {
    this.entradas.emit('entradas');
  }

  cambiarCiudadFav() {
    const valores = this.formularioCiudadFav.value;
    const newUsuario = {
      nombre: "",
      apellidos: "",
      correo: "",
      contrasena: "",
      telefono: 0,
      cp: 0,
      direccion: "",
      provincia: {
        idprovincia: 0
      },
      provinciafav: {
        idprovincia: 0
      },
      fechanacimiento: ""
    };

    newUsuario.nombre = this.usuario.nombre!
    newUsuario.apellidos = this.usuario.apellidos!
    newUsuario.correo = this.usuario.correo!
    newUsuario.contrasena = this.usuario.contrasena!
    newUsuario.telefono = parseInt(this.usuario.telefono!)
    newUsuario.cp = parseInt(this.usuario.cp!)
    newUsuario.direccion = this.usuario.direccion!
    newUsuario.fechanacimiento = this.usuario.fechanacimiento!
    newUsuario.provincia.idprovincia = parseInt(this.usuario.provincia.idprovincia!)
    newUsuario.provinciafav.idprovincia = parseInt(valores.ciudad!)

    this.usuarioService.actualizarUsuario(parseInt(this.usuario.idusuario), newUsuario).subscribe(result => {
      console.log(result)
      window.location.reload()
    })
  }

  cerrarSesion() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['login'])
  }
}
