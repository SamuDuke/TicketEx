import { Component } from '@angular/core';
import { LugarService } from '../../../../../servicios/lugar.service';
import { RouterLink } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mostrar-lugar',
  standalone: true,
  imports: [RouterLink, GoogleMapsModule],
  templateUrl: './mostrar-lugar.component.html',
  styleUrl: './mostrar-lugar.component.scss'
})
export class MostrarLugarComponent {
  lugares: any;
  options: google.maps.MapOptions = {
    mapId: "Eventos",
    center: {
      lat: 40.4165,
      lng: -3.70256
    },
    zoom: 6
  };
  locations: any[] = []

  alertConfirmEliminar: boolean = false;
  alertErrorEliminar: boolean = false;

  constructor(private servicio: LugarService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar() {
    this.servicio.listarLugares().subscribe(datos => {
      this.lugares = datos;
      this.lugares.forEach((lugar: any) => {
        const { coordenadax, coordenaday } = lugar;
        this.locations.push({ lat: parseFloat(coordenadax), lng: parseFloat(coordenaday) });
      });
    })
  }

  eliminar(id: number) {
    this.servicio.eliminarLugar(id).subscribe(
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
}
