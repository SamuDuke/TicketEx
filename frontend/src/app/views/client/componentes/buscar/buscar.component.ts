import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoriaService } from '../../../../servicios/categoria.service';
import { EventoService } from '../../../../servicios/evento.service';
import { FormsModule } from '@angular/forms';
import { ProvinciaService } from '../../../../servicios/provincia.service';
import { servidorImg } from '../../../../../environments/environment';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent {

  categorias: any
  eventos: any
  provincias: any
  nombre: string = ''
  fechaI: string = ''
  fechaF: string = ''
  ciudad: string = ''
  categoria: string = ''

  constructor(private categoriaService: CategoriaService, private eventoService: EventoService, private provinciaService: ProvinciaService) {
    this.categoriaService.listarCategorias().subscribe((result: any) => {
      this.categorias = result
    });
    this.eventoService.listarEventos().subscribe((result: any) => {
      this.eventos = result
    });
    this.provinciaService.listarProvincias().subscribe((result: any) => {
      this.provincias = result
    });
  }

  formateoFechaInv(dia: any): string {
    const fecha = new Date(dia);
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  }

  limpiarF() {
    this.fechaI = ''
    this.fechaF = ''
  }
  limpiarCiu() {
    this.ciudad = ''
  }
  limpiarCat() {
    this.categoria = ''
  }

  limpiarFiltros() {
    this.fechaI = ''
    this.fechaF = ''
    this.ciudad = ''
    this.categoria = ''
  }

  buscarCat(nombre: string) {
    this.categoria = nombre
  }

  filtrarEventos() {
    return this.eventos.filter((e: any) => {
      const coincideNombre = this.nombre === '' || e.nombre.toLowerCase().includes(this.nombre.toLowerCase());
      const coincideFechaInicio = this.fechaI === '' || new Date(e.fecha) >= new Date(this.fechaI);
      const coincideFechaFin = this.fechaF === '' || new Date(e.fecha) <= new Date(this.fechaF);
      const coincideCiudad = this.ciudad === '' || e.lugar.provincia.nombre === (this.ciudad);
      const coincideCategoria = this.categoria === '' || e.categoria.nombre === (this.categoria);

      return coincideNombre && coincideFechaInicio && coincideFechaFin && coincideCiudad && coincideCategoria;
    });
  }

  obtenerRutaImagenCat(nombreImagen: string): string {
    return `${servidorImg.urlServidor}/img/categorias/${nombreImagen}`;
  }
  obtenerRutaImagenEv(nombreImagen: string): string {
    return `${servidorImg.urlServidor}/img/eventos/${nombreImagen}`;
  }
}
