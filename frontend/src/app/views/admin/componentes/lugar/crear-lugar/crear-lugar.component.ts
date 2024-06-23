import { Component } from '@angular/core';
import { LugarService } from '../../../../../servicios/lugar.service';
import { ProvinciaService } from '../../../../../servicios/provincia.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { EncryptService } from '../../../../../servicios/encrypt.service';
import { Lugar } from '../../../../../modelos/lugar';

@Component({
  selector: 'app-crear-lugar',
  standalone: true,
  imports: [ReactiveFormsModule, GoogleMapsModule, MapInfoWindow, MapAdvancedMarker, CommonModule],
  templateUrl: './crear-lugar.component.html',
  styleUrl: './crear-lugar.component.scss'
})
export class CrearLugarComponent {

  lugar: Lugar = new Lugar();
  provincias: any;
  options: google.maps.MapOptions = {
    mapId: "Eventos",
    center: {
      lat: 40.4165,
      lng: -3.70256
    },
    zoom: 6
  };
  marcador: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  constructor(private servicio: LugarService, private provinciaService: ProvinciaService, private router: Router, private encryptService: EncryptService) {
    this.provinciaService.listarProvincias().subscribe(result => {
      this.provincias = result
    })
  }

  formularioLugar = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    provincia: new FormControl('', [Validators.required]),
  });
  submitted: boolean = false;

  alertErrorDatos: boolean = false;
  alertConfirmCrear: boolean = false;
  alertErrorCrear: boolean = false;

  enviar() {
    this.submitted = true;
    const valores = this.formularioLugar.value;
    if (this.formularioLugar.invalid || this.marcador.lat == 0 || this.marcador.lat == 0) {
      this.alertErrorDatos = true;
      setTimeout(() => {
        this.alertErrorDatos = false;
      }, 3000);
      return
    } else {
      if (valores.provincia != null) {
        const newLug = {
          nombre: valores.nombre,
          direccion: valores.direccion,
          coordenadax: this.marcador.lat,
          coordenaday: this.marcador.lng,
          provincia: {
            idprovincia: parseInt(valores.provincia)
          }
        }
        this.servicio.crearLugar(newLug).subscribe(
          (result: any) => {
            console.log(result);
            this.alertConfirmCrear = true;
            setTimeout(() => {
              this.router.navigate(['admin/lugar/mostrar']);
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

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.marcador = event.latLng.toJSON()
    }
  }

  openInfo(marker: MapAdvancedMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker)
  }
}
