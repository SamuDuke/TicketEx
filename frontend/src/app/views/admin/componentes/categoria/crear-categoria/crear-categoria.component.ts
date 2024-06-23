import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../../../modelos/categoria';
import { CategoriaService } from '../../../../../servicios/categoria.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.scss'
})
export class CrearCategoriaComponent {

  categoria: Categoria = new Categoria()

  constructor(private servicio: CategoriaService, private router: Router) { }

  formularioCategoria = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(256)]),
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

      this.servicio.crearCategoria(newCat).subscribe(
        (result: any) => {
          console.log(result);
          this.alertConfirmCrear = true;
          setTimeout(() => {
            this.router.navigate(['admin/categoria/mostrar']);
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
