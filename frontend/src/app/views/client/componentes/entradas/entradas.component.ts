import { Component, Input } from '@angular/core';
import { EntradaService } from '../../../../servicios/entrada.service';
import { RouterLink } from '@angular/router';
import { servidorImg } from '../../../../../environments/environment';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.scss'
})
export class EntradasComponent {

  @Input() usuario: any
  entradas: any

  constructor(private entradaService: EntradaService) {
    this.entradaService.listarEntradas().subscribe((result: any) => {
      this.entradas = result
    })
  }

  filtrarEntradas() {
    return this.entradas.filter((e: any) => {
      const logeado = e.usuario.correo == this.usuario.correo;

      return logeado;
    });
  }

  filtrarEntradasCompradas() {
    return this.entradas.filter((e: any) => {
      const comprada = e.estado == 'comprada';
      const logeado = e.usuario.correo == this.usuario.correo;

      return comprada && logeado;
    });
  }

  filtrarEntradasVenta() {
    return this.entradas.filter((e: any) => {
      const enVentaReserva = e.estado == 'en venta';
      const logeado = e.usuario.correo == this.usuario.correo;

      return enVentaReserva && logeado;
    });
  }

  filtrarEntradasReservadas() {
    return this.entradas.filter((e: any) => {
      const enVentaReserva = e.estado == 'reservada';
      const logeado = e.usuario.correo == this.usuario.correo;

      return enVentaReserva && logeado;
    });
  }

  formateoFechaInv(dia: any): string {
    const fecha = new Date(dia);
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  }

  obtenerRutaImagenEv(nombreImagen: string): string {
    return `${servidorImg.urlServidor}/img/eventos/${nombreImagen}`;
  }
}
