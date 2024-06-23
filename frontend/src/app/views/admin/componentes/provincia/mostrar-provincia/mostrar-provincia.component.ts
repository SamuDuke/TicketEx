import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../../../../servicios/provincia.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mostrar-provincia',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mostrar-provincia.component.html',
  styleUrl: './mostrar-provincia.component.scss'
})
export class MostrarProvinciaComponent implements OnInit {

  provincias: any;

  alertConfirmEliminar: boolean = false;
  alertErrorEliminar: boolean = false;

  constructor(private servicio: ProvinciaService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar() {
    this.servicio.listarProvincias().subscribe(datos => {
      this.provincias = datos;
    })
  }

  eliminar(id: number) {
    this.servicio.eliminarProvincia(id).subscribe(
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
