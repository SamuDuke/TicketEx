import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../../servicios/usuario.service';
import { ProvinciaService } from '../../../../../servicios/provincia.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../../modelos/usuario';
import { EncryptService } from '../../../../../servicios/encrypt.service';
import { ValidacionesPropias } from '../../../../../utils/validaciones-propias';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent {

  usuario: Usuario = new Usuario();
  provincias: any

  constructor(private servicio: UsuarioService, private provinciaService: ProvinciaService, private router: Router, private encryptService: EncryptService) {
    this.provinciaService.listarProvincias().subscribe(result => {
      this.provincias = result
    })
  }

  formularioUsuario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(100), ValidacionesPropias.correoValido]),
    psw: new FormControl('', [Validators.required, Validators.maxLength(64), ValidacionesPropias.contrasenaValida]),
    fechanacimiento: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    cp: new FormControl('', [Validators.required]),
    provincia: new FormControl('', [Validators.required]),
    provinciafav: new FormControl('', [Validators.required]),
  });
  submitted: boolean = false;

  alertConfirmCrear: boolean = false;
  alertErrorCrear: boolean = false;

  enviar() {
    this.submitted = true;
    const valores = this.formularioUsuario.value
    if (this.formularioUsuario.invalid) {
      return
    } else {
      if (valores.provincia != null && valores.provinciafav != null) {
        const newUser = {
          nombre: valores.nombre,
          apellidos: valores.apellidos,
          correo: valores.email,
          contrasena: this.encryptService.encrypt(valores.psw!),
          telefono: valores.telefono,
          cp: valores.cp,
          direccion: valores.direccion,
          provincia: {
            idprovincia: parseInt(valores.provincia)
          },
          provinciafav: {
            idprovincia: parseInt(valores.provinciafav)
          },
          fechanacimiento: valores.fechanacimiento
        };
        this.servicio.crearUsuario(newUser).subscribe(
          (result: any) => {
            console.log(result);
            this.alertConfirmCrear = true;
            setTimeout(() => {
              this.router.navigate(['admin/usuario/mostrar']);
            }, 3000);
          },
          (error: any) => {
            console.log(error);
            this.alertErrorCrear = true;
            setTimeout(() => {
              this.alertErrorCrear = false;
            }, 3000);
          });
      }
    }
  }
}
