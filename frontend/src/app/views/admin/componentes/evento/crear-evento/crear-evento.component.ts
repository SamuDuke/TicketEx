import { Component } from '@angular/core';
import { EventoService } from '../../../../../servicios/evento.service';
import { CategoriaService } from '../../../../../servicios/categoria.service';
import { LugarService } from '../../../../../servicios/lugar.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Evento } from '../../../../../modelos/evento';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.scss'
})
export class CrearEventoComponent {

  evento: Evento = new Evento();
  categorias: any;
  lugares: any;

  constructor(private servicio: EventoService, private categoriaService: CategoriaService, private lugarService: LugarService, private router: Router) {
    this.categoriaService.listarCategorias().subscribe(result => {
      this.categorias = result
    })
    this.lugarService.listarLugares().subscribe(result => {
      this.lugares = result
    })
  }

  formularioEvento = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    fecha: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    edad: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    lugar: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required])
  });
  submitted: boolean = false;
  formData = new FormData();
  nombreImg: any;
  srcPreview: any = '';

  alertConfirmCrear: boolean = false;
  alertErrorCrear: boolean = false;

  enviar() {
    this.submitted = true;
    const valores = this.formularioEvento.value
    if (this.formularioEvento.invalid) {
      return
    } else {
      if (valores.lugar != null && valores.categoria != null) {
        this.servicio.subirImg(this.formData).subscribe(
          (result: any) => {
            console.log('Imagen de entrada subida correctamente', this.nombreImg);
          },
          (error: any) => {
            console.log(error);
          });
        const newEv = {
          nombre: valores.nombre,
          fecha: valores.fecha,
          hora: valores.hora,
          descripcion: valores.descripcion,
          edad: parseInt(valores.edad!),
          img: this.nombreImg,
          categoria: {
            idcategoria: parseInt(valores.categoria)
          },
          lugar: {
            idlugar: parseInt(valores.lugar)
          }
        }
        this.servicio.crearEvento(newEv).subscribe(
          (result: any) => {
            console.log(result);
            this.alertConfirmCrear = true;
            setTimeout(() => {
              this.router.navigate(['admin/evento/mostrar']);
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    this.formData.append('img', file);
    this.nombreImg = file.name
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
