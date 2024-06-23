import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { isPlatformBrowser } from '@angular/common';
import { UsuarioService } from '../../../../../servicios/usuario.service';
import { EntradaService } from '../../../../../servicios/entrada.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { servidorImg } from '../../../../../../environments/environment';

@Component({
  selector: 'app-entrada-detalle',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './entrada-detalle.component.html',
  styleUrl: './entrada-detalle.component.scss'
})
export class EntradaDetalleComponent implements OnInit {

  entradaID!: string;
  entrada: any;
  localUser: any;
  usuarios: any;
  loggedUser: any;

  formularioVender = new FormGroup({
    usuario: new FormControl('')
  })
  precioVenta: string = ''
  correoVender: string = ''
  precioNuevo: string = ''

  mostrarAlertConfirmacionEliminada: boolean = false;
  mostrarAlertErrorEliminada: boolean = false;
  mostrarAlertConfirmacionEnVenta: boolean = false;
  mostrarAlertErrorEnVenta: boolean = false;
  mostrarAlertConfirmacionPrecio: boolean = false;
  mostrarAlertErrorPrecio: boolean = false;
  mostrarAlertConfirmacion: boolean = false;
  mostrarAlertError: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private usuarioService: UsuarioService, private entradaService: EntradaService,
    private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.entradaID = parametros.get("id")!;
      this.cargarEntrada(parseInt(this.entradaID));
    });
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

  cargarEntrada(id: number) {
    this.entradaService.getEntrada(id).subscribe((result: any) => {
      this.entrada = result
      this.precioVenta = this.entrada.precio
      this.precioNuevo = this.entrada.precio
    })
  }

  limpiarV() {
    this.precioVenta = ''
  }

  limpiarE() {
    this.precioNuevo = ''
  }

  limpiarC() {
    this.correoVender = ''
  }

  eliminarEntrada() {
    this.entradaService.eliminarEntrada(parseInt(this.entradaID)).subscribe(
      (result: any) => {
        console.log(result);
        this.mostrarAlertConfirmacionEliminada = true;
        setTimeout(() => {
          this.router.navigate(['client'])
        }, 3000);
      },
      (error: any) => {
        console.log(error);
        this.mostrarAlertErrorEliminada = true;
        setTimeout(() => {
          this.mostrarAlertErrorEliminada = false;
        }, 3000);
      })
  }

  ponerEnVenta() {
    if (this.precioVenta != '') {
      const newEnt = {
        identrada: this.entrada.identrada,
        precio: parseFloat(this.precioVenta),
        estado: 'en venta',
        img: this.entrada.img,
        usuario: {
          idusuario: this.entrada.usuario.idusuario
        },
        evento: {
          idevento: this.entrada.evento.idevento
        }
      }

      this.entradaService.actualizarEntrada(parseInt(this.entradaID), newEnt).subscribe((result: any) => {
        console.log(result);
        this.mostrarAlertConfirmacionEnVenta = true;
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
        (error) => {
          console.log(error);
          this.mostrarAlertErrorEnVenta = true;
          setTimeout(() => {
            this.mostrarAlertErrorEnVenta = false;
          }, 3000);
        })
    }
  }

  actualizarPrecio() {
    if (this.precioNuevo != '') {
      const newEnt = {
        identrada: this.entrada.identrada,
        precio: parseFloat(this.precioNuevo),
        estado: this.entrada.estado,
        img: this.entrada.img,
        usuario: {
          idusuario: this.entrada.usuario.idusuario
        },
        evento: {
          idevento: this.entrada.evento.idevento
        }
      }

      this.entradaService.actualizarEntrada(parseInt(this.entradaID), newEnt).subscribe((result: any) => {
        console.log(result);
        this.mostrarAlertConfirmacionPrecio = true;
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      },
        (error) => {
          console.log(error);
          this.mostrarAlertErrorPrecio = true;
          setTimeout(() => {
            this.mostrarAlertErrorPrecio = false;
          }, 3000);
        })
    }
  }

  venderEntrada() {
    if (this.correoVender != '') {
      const existeComprador = this.filtrarUsuario(this.correoVender);
      if (existeComprador.length === 0) {
        this.mostrarAlertError = true;
        setTimeout(() => {
          this.mostrarAlertError = false;
        }, 3000);
        return;
      }
      const idComprador = existeComprador[0].idusuario;
      const newEnt = {
        identrada: 0,
        precio: 0,
        estado: '',
        img: '',
        usuario: {
          idusuario: 0
        },
        evento: {
          idevento: 0
        }
      }

      newEnt.identrada = parseInt(this.entradaID);
      newEnt.estado = 'comprada'
      newEnt.precio = parseFloat(this.entrada.precio)
      newEnt.img = this.entrada.img
      newEnt.evento.idevento = parseInt(this.entrada.evento.idevento)
      newEnt.usuario.idusuario = parseInt(idComprador)
      console.log(newEnt)
      this.entradaService.actualizarEntrada(parseInt(this.entradaID), newEnt).subscribe((result: any) => {
        console.log(result);
        this.mostrarAlertConfirmacion = true;
        setTimeout(() => {
          this.router.navigate(['client'])
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
    }
  }

  filtrarUsuario(correo: string) {
    return this.usuarios.filter((u: any) => {
      const coincideCorreo = u.correo === correo;

      return coincideCorreo;
    });
  }

  obtenerRutaImagenEntrada(nombreImagen: string): string {
    return `${servidorImg.urlServidor}/img/entradas/${nombreImagen}`;
  }

  obtenerRutaImagenEv(nombreImagen: string): string {
    return `${servidorImg.urlServidor}/img/eventos/${nombreImagen}`;
  }

  formateoFechaInv(dia: any): string {
    const fecha = new Date(dia);
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  }

  formateoFechaEsp(dia: any): string {
    const fecha = new Date(dia);
    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const diaSemana = diasSemana[fecha.getDay()];
    const diaNumero = fecha.getDate();
    const mes = meses[fecha.getMonth()];

    return `${diaSemana}, ${diaNumero} ${mes}`;
  }

  retornar() {
    this.router.navigate(['client']);
  }
}
