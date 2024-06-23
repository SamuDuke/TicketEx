import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { isPlatformBrowser } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  localUser: any;
  usuarios: any;
  loggedUser: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const claveLocal = localStorage.getItem('loggedUser');
      if (claveLocal != null) {
        this.localUser = JSON.parse(claveLocal);
        this.recuperarUsuarioLogeado(this.localUser[0].email)
          .then(user => {
            this.loggedUser = user
            console.log('Logged user:', this.loggedUser);
          })
          .catch(error => {
            console.error('Error recuperando usuario:', error)
          });
      } else {
        console.log('No user logged in.');
      }
    }
  }

  recuperarUsuarioLogeado(correo: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usuarioService.listarUsuarios().subscribe((result: any) => {
        this.usuarios = result
        const loggedUser = this.usuarios.find((user: any) => user.correo === correo);
        if (loggedUser) {
          resolve(loggedUser);
        } else {
          reject(new Error('Usuario no encontrado'));
        }
      });
    });
  }
}
