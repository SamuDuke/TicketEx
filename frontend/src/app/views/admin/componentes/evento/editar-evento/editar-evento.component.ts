import { Component, OnInit } from '@angular/core';
import { Evento } from '../../../../../modelos/evento';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventoService } from '../../../../../servicios/evento.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoriaService } from '../../../../../servicios/categoria.service';
import { LugarService } from '../../../../../servicios/lugar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.scss'
})
export class EditarEventoComponent implements OnInit {
  eventoID!: string;
  datosEvento: Evento = new Evento();
  categorias: any;
  lugares: any;

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

  alertConfirmEditar: boolean = false;
  alertErrorEditar: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private servicio: EventoService, private categoriaService: CategoriaService,
    private lugarService: LugarService, private router: Router) {
    this.categoriaService.listarCategorias().subscribe(result => {
      this.categorias = result
    })
    this.lugarService.listarLugares().subscribe(result => {
      this.lugares = result
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.eventoID = parametros.get("id")!;
    })
    this.cargarEvento(parseInt(this.eventoID));
  }

  cargarEvento(id: number) {
    this.servicio.getEvento(id).subscribe((result: any) => {
      this.datosEvento.idevento = result.idevento;
      this.datosEvento.nombre = result.nombre;
      this.datosEvento.fecha = result.fecha,
        this.datosEvento.hora = result.hora;
      this.datosEvento.descripcion = result.descripcion;
      this.datosEvento.edad = result.edad;
      this.datosEvento.img = result.img;
      this.datosEvento.idcategoria = result.categoria.idcategoria;
      this.datosEvento.idlugar = result.lugar.idlugar;
      this.rellenarForm();
    })
  }

  rellenarForm() {
    this.formularioEvento = new FormGroup({
      nombre: new FormControl(this.datosEvento.nombre, [Validators.required, Validators.maxLength(45)]),
      fecha: new FormControl(this.datosEvento.fecha.toString(), [Validators.required]),
      hora: new FormControl(this.datosEvento.hora.toString(), [Validators.required]),
      descripcion: new FormControl(this.datosEvento.descripcion, [Validators.required, Validators.maxLength(45)]),
      edad: new FormControl(this.datosEvento.edad.toString(), [Validators.required]),
      categoria: new FormControl(this.datosEvento.idcategoria.toString(), [Validators.required]),
      lugar: new FormControl(this.datosEvento.idlugar.toString(), [Validators.required]),
      img: new FormControl('')
    });
    this.nombreImg = this.datosEvento.img;
  }

  enviar() {
    this.submitted = true;
    const valores = this.formularioEvento.value;
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
        };
        this.servicio.actualizarEvento(parseInt(this.eventoID), newEv).subscribe(
          (result: any) => {
            console.log(result)
            this.alertConfirmEditar = true;
            setTimeout(() => {
              this.router.navigate(['admin/evento/mostrar']);
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
