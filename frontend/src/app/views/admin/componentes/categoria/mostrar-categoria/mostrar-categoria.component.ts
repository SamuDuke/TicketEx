import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../../servicios/categoria.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { servidorImg } from '../../../../../../environments/environment';

@Component({
  selector: 'app-mostrar-categoria',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './mostrar-categoria.component.html',
  styleUrl: './mostrar-categoria.component.scss'
})
export class MostrarCategoriaComponent implements OnInit {

  categorias: any

  alertConfirmEliminar: boolean = false;
  alertErrorEliminar: boolean = false;

  constructor(private servicio: CategoriaService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar() {
    this.servicio.listarCategorias().subscribe(datos => {
      this.categorias = datos;
    })
  }

  eliminar(id: number) {
    this.servicio.eliminarCategoria(id).subscribe(
      (datos: any) => {
        console.log(datos)
        this.alertConfirmEliminar = true;
        this.mostrar();
        setTimeout(() => {
          this.alertConfirmEliminar = false;
        }, 3000);
      },
      (error: any) => {
        console.log(error)
        this.alertErrorEliminar = true;
        setTimeout(() => {
          this.alertErrorEliminar = false;
        }, 3000);
      });
  }

  obtenerRutaImagen(nombreImagen: string): string {
    return `${servidorImg.urlServidor}/img/categorias/${nombreImagen}`;
  }
}
