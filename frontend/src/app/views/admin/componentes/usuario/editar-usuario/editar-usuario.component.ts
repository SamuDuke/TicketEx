import { Component } from '@angular/core';
import { Usuario } from '../../../../../modelos/usuario';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UsuarioService } from '../../../../../servicios/usuario.service';
import { ProvinciaService } from '../../../../../servicios/provincia.service';
import { CommonModule } from '@angular/common';
import { EncryptService } from '../../../../../servicios/encrypt.service';
import { ValidacionesPropias } from '../../../../../utils/validaciones-propias';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent {
  usuarioID!: string;
  datosUsuario: Usuario = new Usuario();
  provincias: any;

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

  alertConfirmEditar: boolean = false;
  alertErrorEditar: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private servicio: UsuarioService, private provinciaService: ProvinciaService,
    private router: Router, private encryptService: EncryptService) {
    this.provinciaService.listarProvincias().subscribe(result => {
      this.provincias = result
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.usuarioID = parametros.get("id")!;
    })
    this.cargarUsuario(parseInt(this.usuarioID))
  }

  cargarUsuario(id: number) {
    this.servicio.getUsuario(id).subscribe((result: any) => {
      this.datosUsuario.idusuario = result.idusuario;
      this.datosUsuario.nombre = result.nombre;
      this.datosUsuario.apellidos = result.apellidos
      this.datosUsuario.correo = result.correo
      this.datosUsuario.contrasena = result.contrasena
      this.datosUsuario.telefono = result.telefono
      this.datosUsuario.cp = result.cp
      this.datosUsuario.direccion = result.direccion
      this.datosUsuario.fechanacimiento = result.fechanacimiento
      this.datosUsuario.idprovincia = result.provincia.idprovincia
      this.datosUsuario.idprovinciafav = result.provinciafav.idprovincia

      this.rellenarForm()
    })
  }

  rellenarForm() {
    this.formularioUsuario = new FormGroup({
      nombre: new FormControl(this.datosUsuario.nombre, [Validators.required, Validators.maxLength(45)]),
      apellidos: new FormControl(this.datosUsuario.apellidos, [Validators.required, Validators.maxLength(45)]),
      email: new FormControl(this.datosUsuario.correo, [Validators.required, Validators.maxLength(100), Validators.email]),
      psw: new FormControl(this.datosUsuario.contrasena, [Validators.required, Validators.maxLength(64)]),
      telefono: new FormControl(this.datosUsuario.telefono.toString(), [Validators.required]),
      cp: new FormControl(this.datosUsuario.cp.toString(), [Validators.required]),
      direccion: new FormControl(this.datosUsuario.direccion, [Validators.required, Validators.maxLength(100)]),
      fechanacimiento: new FormControl(this.datosUsuario.fechanacimiento.toString(), [Validators.required]),
      provincia: new FormControl(this.datosUsuario.idprovincia.toString(), [Validators.required]),
      provinciafav: new FormControl(this.datosUsuario.idprovincia.toString(), [Validators.required])
    });
  }

  enviar() {
    this.submitted = true;
    const valores = this.formularioUsuario.value;
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
        this.servicio.actualizarUsuario(parseInt(this.usuarioID), newUser).subscribe(
          (result: any) => {
            console.log(result)
            this.alertConfirmEditar = true;
            setTimeout(() => {
              this.router.navigate(['admin/usuario/mostrar']);
            }, 3000);
          },
          (error: any) => {
            console.log(error);
            this.alertErrorEditar = true;
            setTimeout(() => {
              this.alertErrorEditar = false;
            }, 3000);
          });
      }
    }
  }
}
