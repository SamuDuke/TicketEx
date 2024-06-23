import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario.service';
import { ProvinciaService } from '../../../servicios/provincia.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EncryptService } from '../../../servicios/encrypt.service';
import { ValidacionesPropias } from '../../../utils/validaciones-propias';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  formularioRegistro = new FormGroup({
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
  })
  submitted: boolean = false;
  alertDatosErroneos: boolean = false;
  alertRegistroErroneo: boolean = false;
  alertRegistroConfirm: boolean = false;
  usuarios: any;
  provincias: any;

  constructor(private router: Router, private usuarioService: UsuarioService, private provinciaService: ProvinciaService, private encryptService: EncryptService) {
    this.usuarioService.listarUsuarios().subscribe((result: any) => {
      this.usuarios = result;
    })
    this.provinciaService.listarProvincias().subscribe((result: any) => {
      this.provincias = result;
    })
  }

  registrar() {
    this.submitted = true;
    const valores = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      this.alertDatosErroneos = true;
      setTimeout(() => {
        this.alertDatosErroneos = false;
      }, 3000);
      return;
    } else {
      if (valores.provincia != null && valores.provinciafav != null) {
        const newUsuario = {
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
        this.usuarioService.crearUsuario(newUsuario).subscribe(
          (result: any) => {
            console.log(result);
            this.alertRegistroConfirm = true;
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
          },
          (error: any) => {
            console.log(error);
            this.alertRegistroErroneo = true;
            setTimeout(() => {
              this.alertRegistroErroneo = false;
            }, 3000);
          });
      }
    }
  }
  
  mostrarInfo(){
    console.log('over');
    
  }
}
