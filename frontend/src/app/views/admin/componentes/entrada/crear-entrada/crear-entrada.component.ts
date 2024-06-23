import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { EntradaService } from '../../../../../servicios/entrada.service';
import { Router } from '@angular/router';
import { EventoService } from '../../../../../servicios/evento.service';
import { UsuarioService } from '../../../../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { Entrada } from '../../../../../modelos/entrada';

@Component({
  selector: 'app-crear-entrada',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-entrada.component.html',
  styleUrl: './crear-entrada.component.scss'
})
export class CrearEntradaComponent {

  entrada: Entrada = new Entrada();
  eventos: any;
  usuarios: any;

  constructor(private servicio: EntradaService, private eventoService: EventoService, private usuarioService: UsuarioService, private router: Router) {
    this.eventoService.listarEventos().subscribe(result => {
      this.eventos = result
    });

    this.usuarioService.listarUsuarios().subscribe(result => {
      this.usuarios = result
    });

    this.servicio.listarEntradas().subscribe((result: any) => {
      result.forEach(() => {
        this.numEntradas += 1;
      })
    });
  }

  formularioEntrada = new FormGroup({
    precio: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required]),
    evento: new FormControl('', [Validators.required])
  });
  submitted: boolean = false;
  formData = new FormData();
  nombreImg: any;
  numEntradas: number = 1;
  srcPreview: any = '';

  alertConfirmSubir: boolean = false;
  alertErrorSubir: boolean = false;

  enviar() {
    this.submitted = true;
    const valores = this.formularioEntrada.value;
    if (this.formularioEntrada.invalid) {
      return
    } else {
      this.servicio.subirImg(this.formData).subscribe(
        (result: any) => {
          console.log('Imagen de entrada subida correctamente', this.nombreImg);
        },
        (error: any) => {
          console.log(error);
        });
      if (valores.usuario != null && valores.evento != null) {
        const newEntrada = {
          precio: valores.precio,
          estado: valores.estado,
          img: this.nombreImg,
          usuario: {
            idusuario: parseInt(valores.usuario)
          },
          evento: {
            idevento: parseInt(valores.evento)
          }
        };

        this.servicio.crearEntrada(newEntrada).subscribe(
          (result: any) => {
            console.log(result);
            this.alertConfirmSubir = true;
            setTimeout(() => {
              this.router.navigate(['admin/entrada/mostrar']);
            }, 3000);

          },
          (error: any) => {
            console.log(error);
            this.alertErrorSubir = true;
            setTimeout(() => {
              this.alertErrorSubir = false;
            }, 3000);
          });
      }
    }
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

  limpiar() {
    this.srcPreview = ''
  }
}
