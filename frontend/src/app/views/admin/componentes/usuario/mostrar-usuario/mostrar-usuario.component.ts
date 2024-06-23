import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../servicios/usuario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mostrar-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mostrar-usuario.component.html',
  styleUrl: './mostrar-usuario.component.scss'
})
export class MostrarUsuarioComponent implements OnInit {

  usuarios: any

  alertConfirmEliminar: boolean = false;
  alertErrorEliminar: boolean = false;

  constructor(private servicio: UsuarioService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar() {
    this.servicio.listarUsuarios().subscribe(datos => {
      this.usuarios = datos;
    })
  }

  eliminar(id: number) {
    this.servicio.eliminarUsuario(id).subscribe(
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
