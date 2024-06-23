import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoriaService } from '../../../../../servicios/categoria.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../../../modelos/categoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.scss'
})
export class EditarCategoriaComponent implements OnInit {
  categoriaID!: string
  datosCategoria: Categoria = new Categoria()

  formularioCategoria = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    img: new FormControl('')
  });
  submitted: boolean = false;
  formData = new FormData();
  nombreImg: any;
  srcPreview: any = '';

  alertConfirmEditar: boolean = false;
  alertErrorEditar: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private servicio: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.categoriaID = parametros.get("id")!;
    })
    this.cargarCategoria(parseInt(this.categoriaID))
  }

  cargarCategoria(id: number) {
    this.servicio.getCategoria(id).subscribe((result: any) => {
      this.datosCategoria.idcategoria = result.idcategoria;
      this.datosCategoria.nombre = result.nombre;
      this.datosCategoria.descripcion = result.descripcion;
      this.datosCategoria.img = result.img;
      this.rellenarForm();
    })
  }

  rellenarForm() {
    this.formularioCategoria = new FormGroup({
      nombre: new FormControl(this.datosCategoria.nombre, [Validators.required, Validators.maxLength(32)]),
      descripcion: new FormControl(this.datosCategoria.descripcion, [Validators.required, Validators.maxLength(256)]),
      img: new FormControl('')
    });
    this.nombreImg = this.datosCategoria.img;
  }

  enviar() {
    this.submitted = true;
    const valores = this.formularioCategoria.value;
    if (this.formularioCategoria.invalid) {
      return
    } else {
      this.servicio.subirImg(this.formData).subscribe(
        (result: any) => {
          console.log('Imagen de entrada subida correctamente', this.nombreImg);
        },
        (error: any) => {
          console.log(error);
        });

      const newCat = {
        nombre: valores.nombre,
        descripcion: valores.descripcion,
        img: this.nombreImg
      }

      this.servicio.actualizarCategoria(parseInt(this.categoriaID), newCat).subscribe(
        (result: any) => {
          console.log(result)
          this.alertConfirmEditar = true;
          setTimeout(() => {
            this.router.navigate(['admin/categoria/mostrar']);
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
