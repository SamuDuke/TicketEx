import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { UsuarioService } from '../../../../../servicios/usuario.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProvinciaService } from '../../../../../servicios/provincia.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Usuario } from '../../../../../modelos/usuario';
import { CommonModule } from '@angular/common';
import { EncryptService } from '../../../../../servicios/encrypt.service';
import { ValidacionesPropias } from '../../../../../utils/validaciones-propias';

@Component({
  selector: 'app-cuenta-editar',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './cuenta-editar.component.html',
  styleUrl: './cuenta-editar.component.scss'
})
export class CuentaEditarComponent {

  formularioUsuario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    fechanacimiento: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    cp: new FormControl('', [Validators.required]),
    provincia: new FormControl('', [Validators.required]),
  })
  submitted: boolean = false;
  usuarioID!: string;
  datosUsuario: Usuario = new Usuario()
  usuario: any;
  provincias: any;

  formularioPsw = new FormGroup({
    nueva: new FormControl('', [Validators.required, Validators.maxLength(64), ValidacionesPropias.contrasenaValida]),
    repetida: new FormControl('', [Validators.required, Validators.maxLength(64), ValidacionesPropias.contrasenaValida])
  })
  submittedPsw: boolean = false;
  alertDatosErroneos: boolean = false;
  alertUpdateDatosErroneo: boolean = false;
  alertUpdateDatosConfirm: boolean = false;
  alertPswErroneas: boolean = false;
  alertUpdatePswErroneo: boolean = false;
  alertUpdatePswConfirm: boolean = false;

  constructor(private usuarioService: UsuarioService, private provinciaService: ProvinciaService, private activatedRoute: ActivatedRoute,
    private router: Router, private encryptService: EncryptService) {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.usuarioID = parametros.get("id")!;
    });
    this.cargarUsuario(parseInt(this.usuarioID));
    this.provinciaService.listarProvincias().subscribe((result: any) => {
      this.provincias = result
    });
  }

  cargarUsuario(id: number) {
    this.usuarioService.getUsuario(id).subscribe((result: any) => {
      this.usuario = result
      this.datosUsuario.idusuario = result.idusuario;
      this.datosUsuario.nombre = result.nombre;
      this.datosUsuario.apellidos = result.apellidos
      this.datosUsuario.correo = result.correo
      this.datosUsuario.telefono = result.telefono
      this.datosUsuario.cp = result.cp
      this.datosUsuario.direccion = result.direccion
      this.datosUsuario.fechanacimiento = result.fechanacimiento
      this.datosUsuario.idprovincia = result.provincia.idprovincia

      this.rellenarForm()
    })
  }

  rellenarForm() {
    this.formularioUsuario = new FormGroup({
      nombre: new FormControl(this.datosUsuario.nombre, [Validators.required, Validators.maxLength(45)]),
      apellidos: new FormControl(this.datosUsuario.apellidos, [Validators.required, Validators.maxLength(45)]),
      fechanacimiento: new FormControl(this.datosUsuario.fechanacimiento.toString(), [Validators.required]),
      telefono: new FormControl(this.datosUsuario.telefono.toString(), [Validators.required]),
      direccion: new FormControl(this.datosUsuario.direccion, [Validators.required, Validators.maxLength(100)]),
      cp: new FormControl(this.datosUsuario.cp.toString(), [Validators.required]),
      provincia: new FormControl(this.datosUsuario.idprovincia.toString(), [Validators.required]),
    });
  }

  enviar() {
    this.submitted = true;
    const valores = this.formularioUsuario.value;
    if (this.formularioUsuario.invalid) {
      this.alertDatosErroneos = true;
      setTimeout(() => {
        this.alertDatosErroneos = false;
      }, 3000);
      return
    } else {
      const newUsuario = {
        nombre: valores.nombre,
        apellidos: valores.apellidos,
        correo: this.usuario.correo,
        contrasena: this.usuario.contrasena,
        telefono: parseInt(valores.telefono!),
        cp: parseInt(valores.cp!),
        direccion: valores.direccion,
        provincia: {
          idprovincia: parseInt(valores.provincia!)
        },
        provinciafav: {
          idprovincia: this.usuario.provinciafav.idprovincia
        },
        fechanacimiento: valores.fechanacimiento
      };

      this.usuarioService.actualizarUsuario(parseInt(this.usuarioID), newUsuario).subscribe(
        (result: any) => {
          console.log(result)
          this.alertUpdateDatosConfirm = true;
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        },
        (error: any) => {
          console.log(error)
          this.alertUpdateDatosErroneo = true;
          setTimeout(() => {
            this.alertUpdateDatosErroneo = false;
          }, 3000);
        })
    }
  }

  reestablecerPsw() {
    this.submittedPsw = true;
    const valores = this.formularioPsw.value;
    if (this.formularioPsw.invalid) {
      this.alertDatosErroneos = true;
      setTimeout(() => {
        this.alertDatosErroneos = false;
      }, 3000);
      return
    } else {
      if (valores.nueva === valores.repetida) {
        const newUsuario = {
          nombre: this.usuario.nombre,
          apellidos: this.usuario.apellidos,
          correo: this.usuario.correo,
          contrasena: this.encryptService.encrypt(valores.repetida!),
          telefono: parseInt(this.usuario.telefono),
          cp: parseInt(this.usuario.cp),
          direccion: this.usuario.direccion,
          provincia: {
            idprovincia: this.usuario.provincia.idprovincia
          },
          provinciafav: {
            idprovincia: this.usuario.provinciafav.idprovincia
          },
          fechanacimiento: this.usuario.fechanacimiento
        };

        this.usuarioService.actualizarUsuario(parseInt(this.usuarioID), newUsuario).subscribe(result => {
          console.log(result)
          this.alertUpdatePswConfirm = true;
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        })
      } else {
        this.alertPswErroneas = true;
        setTimeout(() => {
          this.alertPswErroneas = false;
        }, 3000);
      }
    }
  }

  retornar() {
    this.router.navigate(['client']);
  }
}
