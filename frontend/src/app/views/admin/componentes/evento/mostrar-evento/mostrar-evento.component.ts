import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../../../servicios/evento.service';
import { RouterLink } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { servidorImg } from '../../../../../../environments/environment';

@Component({
  selector: 'app-mostrar-evento',
  standalone: true,
  imports: [RouterLink, GoogleMapsModule],
  templateUrl: './mostrar-evento.component.html',
  styleUrl: './mostrar-evento.component.scss'
})
export class MostrarEventoComponent implements OnInit {

  eventos: any
  options: google.maps.MapOptions = {
    mapId: "Eventos",
    center: {
      lat: 40.4165,
      lng: -3.70256
    },
    zoom: 6
  };
  locations: any[] = [];

  alertConfirmEliminar: boolean = false;
  alertErrorEliminar: boolean = false;

  constructor(private servicio: EventoService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar() {
    this.servicio.listarEventos().subscribe(datos => {
      this.eventos = datos;
      this.eventos.forEach((evento: any) => {
        const { lugar } = evento;
        const { coordenadax, coordenaday } = lugar;
        this.locations.push({ lat: parseFloat(coordenadax), lng: parseFloat(coordenaday) });
      });
    })
  }

  eliminar(id: number) {
    this.servicio.eliminarEvento(id).subscribe(
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
    return `${servidorImg.urlServidor}/img/eventos/${nombreImagen}`;
  }
}
