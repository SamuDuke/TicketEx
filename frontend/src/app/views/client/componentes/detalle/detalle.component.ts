import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EventoService } from '../../../../servicios/evento.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { EntradaService } from '../../../../servicios/entrada.service';
import { servidorImg } from '../../../../../environments/environment';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [HeaderComponent, GoogleMapsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent implements OnInit {

  eventoID!: string
  evento: any;
  localUser: any;
  usuarios: any;
  loggedUser: any;
  entradas: any[] = [];
  options: google.maps.MapOptions = {
    mapId: "Lugar",
    center: {
      lat: 40.4165,
      lng: -3.70256
    },
    zoom: 15
  };
  marcador: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  mostrarAlertConfirmacion: boolean = false;
  mostrarContactarAlert: boolean = false;
  mostrarAlertError: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private usuarioService: UsuarioService, private eventoService: EventoService,
    private entradaService: EntradaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.eventoID = parametros.get("id")!;
      this.cargarEvento(parseInt(this.eventoID))
    })
    this.entradaService.listarEntradas().subscribe((result: any) => {
      this.entradas = result
    })
  }

  filtrarEntradasVenta() {
    return this.entradas.filter((e: any) => {
      const coincideNombre = this.eventoID == e.evento.idevento;
      const enVenta = e.estado == 'en venta';
      const noLogeado = e.usuario.correo != this.loggedUser?.correo;

      return coincideNombre && enVenta && noLogeado;
    });
  }

  filtrarEntradasReserva() {
    return this.entradas.filter((e: any) => {
      const coincideNombre = this.eventoID == e.evento.idevento;
      const enVenta = e.estado == 'reservada';
      const noLogeado = e.usuario.correo != this.loggedUser?.correo;

      return coincideNombre && enVenta && noLogeado;
    });
  }

  reservarEntrada(id: number) {
    this.entradaService.getEntrada(id).subscribe((result: any) => {
      const entrada = result
      const newEnt = {
        identrada: entrada.identrada,
        precio: entrada.precio,
        estado: 'reservada',
        img: entrada.img,
        usuario: {
          idusuario: entrada.usuario.idusuario
        },
        evento: {
          idevento: entrada.evento.idevento
        }
      }
      this.entradaService.actualizarEntrada(id, newEnt).subscribe((result: any) => {
        console.log(result);
        this.mostrarAlertConfirmacion = true;
        setTimeout(() => {
          window.location.reload()
          this.mostrarAlertConfirmacion = false;
        }, 3000);
      },
        (error) => {
          console.log(error);
          this.mostrarAlertError = true;
          setTimeout(() => {
            this.mostrarAlertError = false;
          }, 3000);
        })
    })
  }

  contactarEntrada() {
    this.mostrarContactarAlert = true;
    setTimeout(() => {
      this.mostrarContactarAlert = false;
    }, 3000);
  }

  obtenerRutaImagenEv(nombreImagen: string): string {
    return `${servidorImg.urlServidor}/img/eventos/${nombreImagen}`;
  }

  cargarEvento(id: number) {
    this.eventoService.getEvento(id).subscribe((result: any) => {
      this.evento = result
      this.loadMarker()
    })
  }

  loadMarker() {
    this.marcador.lat = parseFloat(this.evento.lugar.coordenadax)
    this.marcador.lng = parseFloat(this.evento.lugar.coordenaday)
    this.options.center!.lat = parseFloat(this.evento.lugar.coordenadax)
    this.options.center!.lng = parseFloat(this.evento.lugar.coordenaday)
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const claveLocal = localStorage.getItem('loggedUser');
      if (claveLocal != null) {
        this.localUser = JSON.parse(claveLocal);
        this.recuperarUsuarioLogeado(this.localUser[0].email);
        // console.log('Logged user:', this.loggedUser);
      } else {
        console.log('No user logged in.');
      }
    }
  }

  recuperarUsuarioLogeado(correo: any) {
    this.usuarioService.listarUsuarios().subscribe((result: any) => {
      this.usuarios = result
      this.usuarios.forEach((user: any) => {
        if (user.correo == correo) {
          this.loggedUser = user
        }
      })
    })
  }

  retornar() {
    this.router.navigate(['client']);
  }
}
