import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { UsuarioService } from '../../../../../servicios/usuario.service';
import { Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntradaService } from '../../../../../servicios/entrada.service';
import { EventoService } from '../../../../../servicios/evento.service';

@Component({
  selector: 'app-entrada-subir',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './entrada-subir.component.html',
  styleUrl: './entrada-subir.component.scss'
})
export class EntradaSubirComponent {

  localUser: any;
  usuarios: any;
  loggedUser: any;
  eventos: any;
  numEntradas: number = 1;

  formularioEntrada = new FormGroup({
    precio: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    evento: new FormControl('', [Validators.required])
  })
  submitted: boolean = false;
  alertConfirmSubir: boolean = false;
  alertErrorSubir: boolean = false;
  formData = new FormData();
  nombreImg: any;
  srcPreview: any = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private usuarioService: UsuarioService, private entradaService: EntradaService,
    private eventoService: EventoService, private router: Router) {
    this.eventoService.listarEventos().subscribe((result: any) => {
      this.eventos = result;
    })
    this.entradaService.listarEntradas().subscribe((result: any) => {
      result.forEach(() => {
        this.numEntradas += 1;
      })
    })
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const claveLocal = localStorage.getItem('loggedUser');
      if (claveLocal != null) {
        this.localUser = JSON.parse(claveLocal);
        this.recuperarUsuarioLogeado(this.localUser[0].email);
        // console.log('Logged user:', this.loggedUser);
      } else {
        console.log('No user logged in.');
      }
    }
  }

  recuperarUsuarioLogeado(correo: any) {
    this.usuarioService.listarUsuarios().subscribe((result: any) => {
      this.usuarios = result
      this.usuarios.forEach((user: any) => {
        if (user.correo == correo) {
          this.loggedUser = user
        }
      })
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    this.formData.append('img', file);
    const datos = {
      id: this.numEntradas
    }
    this.formData.append('datos', JSON.stringify(datos));
    this.nombreImg = this.numEntradas + file.name
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.srcPreview = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  }

  crearEntrada() {
    this.submitted = true;
    const valores = this.formularioEntrada.value;
    if (this.formularioEntrada.invalid) {
      return
    } else {
      this.entradaService.subirImg(this.formData).subscribe(
        (result: any) => {
          console.log('Imagen de entrada subida correctamente', this.nombreImg);
        },
        (error: any) => {
          console.log(error);
        });
      if (valores.evento != null) {
        const newEntrada = {
          precio: valores.precio,
          estado: 'comprada',
          img: this.nombreImg,
          usuario: {
            idusuario: this.loggedUser.idusuario
          },
          evento: {
            idevento: parseInt(valores.evento)
          }
        }
        this.entradaService.crearEntrada(newEntrada).subscribe(
          (result: any) => {
            console.log(result);
            this.alertConfirmSubir = true;
            setTimeout(() => {
              this.router.navigate(['client']);
            }, 3000);

          },
          (error: any) => {
            console.log(error);
            this.alertErrorSubir = true;
            setTimeout(() => {
              this.alertErrorSubir = false;
            }, 3000);
          })
      }
    }
  }

  limpiar() {
    this.srcPreview = ''
  }

  retornar() {
    this.router.navigate(['client']);
  }

}
