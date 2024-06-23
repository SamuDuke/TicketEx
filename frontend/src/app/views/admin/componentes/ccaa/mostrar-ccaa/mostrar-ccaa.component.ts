import { Component, OnInit } from '@angular/core';
import { CcaaService } from '../../../../../servicios/ccaa.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mostrar-ccaa',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mostrar-ccaa.component.html',
  styleUrl: './mostrar-ccaa.component.scss'
})
export class MostrarCcaaComponent implements OnInit {

  ccaa: any

  alertConfirmEliminar: boolean = false;
  alertErrorEliminar: boolean = false;

  constructor(private servicio: CcaaService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar() {
    this.servicio.listarComunidades().subscribe(datos => {
      this.ccaa = datos;
    })
  }

  eliminar(id: number) {
    this.servicio.eliminarComunidad(id).subscribe(
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
      })
  }
}
