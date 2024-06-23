import { Component, Input } from '@angular/core';
import { EventoService } from '../../../../servicios/evento.service';
import { RouterLink } from '@angular/router';
import { servidorImg } from '../../../../../environments/environment';

@Component({
  selector: 'app-explora',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './explora.component.html',
  styleUrl: './explora.component.scss'
})
export class ExploraComponent {

  @Input() usuario: any
  eventos: any
  currentWeek: any = {
    lunes: '',
    domingo: ''
  }

  constructor(private eventoService: EventoService) {
    this.eventoService.listarEventos().subscribe((result: any) => {
      this.eventos = result
    })
    this.obtenerSemana(new Date())
  }

  obtenerRutaImagenEv(nombreImagen: string): string {
    return `${servidorImg.urlServidor}/img/eventos/${nombreImagen}`;
  }

  obtenerSemana(dia: any) {
    const fecha = new Date(dia)
    let lunes = 0
    let domingo = 0
    const diaSemana = fecha.getUTCDay();
    const inicioSemana = new Date(fecha);
    const finSemana = new Date(fecha);
    if (diaSemana == 0) {
      lunes = (-6)
      domingo = 0
    } else {
      lunes = (diaSemana - 1) * (-1)
      domingo = (7 - diaSemana)
    }
    inicioSemana.setDate(inicioSemana.getDate() + lunes)
    finSemana.setDate(finSemana.getDate() + domingo)
    this.currentWeek.lunes = this.formateoFecha(inicioSemana)
    this.currentWeek.domingo = this.formateoFecha(finSemana)
  }

  formateoFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }

  formateoFechaInv(dia: any): string {
    const fecha = new Date(dia);
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  }

  isBetweenCurrentWeek(dia: any, currentWeek: any): boolean {
    const hoy = new Date(dia)
    const lunes = new Date(currentWeek.lunes)
    const domingo = new Date(currentWeek.domingo)
    if (hoy >= lunes && hoy <= domingo) {
      return true;
    } else {
      return false;
    }
  }
}
