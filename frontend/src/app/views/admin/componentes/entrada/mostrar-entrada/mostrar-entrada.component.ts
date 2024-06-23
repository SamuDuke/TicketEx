import { Component, OnInit } from '@angular/core';
import { EntradaService } from '../../../../../servicios/entrada.service';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mostrar-entrada',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './mostrar-entrada.component.html',
  styleUrl: './mostrar-entrada.component.scss'
})
export class MostrarEntradaComponent implements OnInit {

  entradas: any

  alertConfirmEliminar: boolean = false;
  alertErrorEliminar: boolean = false;

  constructor(private servicio: EntradaService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar() {
    this.servicio.listarEntradas().subscribe(datos => {
      this.entradas = datos;
    })
  }

  eliminar(id: number) {
    this.servicio.eliminarEntrada(id).subscribe(
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
