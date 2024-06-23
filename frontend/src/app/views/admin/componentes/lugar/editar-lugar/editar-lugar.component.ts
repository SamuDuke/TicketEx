import { Component } from '@angular/core';
import { Lugar } from '../../../../../modelos/lugar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LugarService } from '../../../../../servicios/lugar.service';
import { ProvinciaService } from '../../../../../servicios/provincia.service';
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-lugar',
  standalone: true,
  imports: [ReactiveFormsModule, GoogleMapsModule, CommonModule],
  templateUrl: './editar-lugar.component.html',
  styleUrl: './editar-lugar.component.scss'
})
export class EditarLugarComponent {
  lugarID!: string
  datosLugar: Lugar = new Lugar()
  provincias: any;

  formularioLugar = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    provincia: new FormControl('', [Validators.required]),
  });
  submitted: boolean = false;

  alertConfirmEditar: boolean = false;
  alertErrorEditar: boolean = false;

  options: google.maps.MapOptions = {
    mapId: "Eventos",
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 15
  };
  marcador: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  constructor(private activatedRoute: ActivatedRoute, private servicio: LugarService, private provinciaService: ProvinciaService, private router: Router) {
    this.provinciaService.listarProvincias().subscribe(result => {
      this.provincias = result
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.lugarID = parametros.get("id")!;
    })
    this.cargarLugar(parseInt(this.lugarID))
  }

  cargarLugar(id: number) {
    this.servicio.getLugar(id).subscribe((result: any) => {
      this.datosLugar.idlugar = result.idlugar;
      this.datosLugar.nombre = result.nombre;
      this.datosLugar.direccion = result.direccion;
      this.datosLugar.coordenadax = result.coordenadax;
      this.datosLugar.coordenaday = result.coordenaday;
      this.datosLugar.idprovincia = result.provincia.idprovincia;
      this.rellenarForm()
      this.loadMarker()
    })
  }

  loadMarker() {
    this.marcador.lat = parseFloat(this.datosLugar.coordenadax)
    this.marcador.lng = parseFloat(this.datosLugar.coordenaday)
    this.options.center!.lat = parseFloat(this.datosLugar.coordenadax)
    this.options.center!.lng = parseFloat(this.datosLugar.coordenaday)
  }

  rellenarForm() {
    this.formularioLugar = new FormGroup({
      nombre: new FormControl(this.datosLugar.nombre, [Validators.required, Validators.maxLength(64)]),
      direccion: new FormControl(this.datosLugar.direccion, [Validators.required, Validators.maxLength(128)]),
      provincia: new FormControl(this.datosLugar.idprovincia.toString(), [Validators.required]),
    });
  }

  enviar() {
    this.submitted = true;
    const valores = this.formularioLugar.value;
    if (this.formularioLugar.invalid || this.marcador.lat == 0 || this.marcador.lat == 0) {
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
        this.servicio.actualizarLugar(parseInt(this.lugarID), newLug).subscribe(
          (result: any) => {
            console.log(result);
            this.alertConfirmEditar = true;
            setTimeout(() => {
              this.router.navigate(['admin/lugar/mostrar']);
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

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.marcador = event.latLng.toJSON()
    }
  }

  openInfo(marker: MapAdvancedMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker)
  }
}
