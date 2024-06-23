import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario.service';
import { EncryptService } from '../../../servicios/encrypt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formularioLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    psw: new FormControl('', [Validators.required])
  })
  submitted: boolean = false;
  alertEmailErroneo: boolean = false;
  alertPswErroneo: boolean = false;

  usuarios: any

  constructor(private router: Router, private usuarioService: UsuarioService, private encryptService: EncryptService) {
    this.usuarioService.listarUsuarios().subscribe((result: any) => {
      this.usuarios = result
    })
  }

  logear() {
    this.submitted = true;
    if (this.formularioLogin.invalid) {
      return
    }
    const valores = this.formularioLogin.value;
    const loggedUser = {
      email: valores.email,
      psw: this.encryptService.encrypt(valores.psw!)
    }
    if (valores.email == 'admin@gmail.com' && valores.psw == '1234') {
      this.router.navigate(['admin']);
    }
    this.usuarios.forEach((user: any) => {
      if (valores.email == user.correo) {
        if (valores.psw == this.encryptService.decrypt(user.contrasena)) {
          this.crearLocalStorage(loggedUser);
          this.router.navigate(['client']);
        } else {
          this.alertPswErroneo = true;
          setTimeout(() => {
            this.alertPswErroneo = false;
          }, 3000);
        }
      } else {
        this.alertEmailErroneo = true;
        setTimeout(() => {
          this.alertEmailErroneo = false;
        }, 3000);
      }
    })
  }

  crearLocalStorage(valores: any) {
    const claveLocal = localStorage.getItem('loggedUser');
    if (claveLocal != null) {
      const usuarios = JSON.parse(claveLocal);
      usuarios.push(valores);
      localStorage.setItem('loggedUser', JSON.stringify(usuarios));
    } else {
      const usuarios = [];
      usuarios.push(valores);
      localStorage.setItem('loggedUser', JSON.stringify(usuarios))
    }
  }
}
