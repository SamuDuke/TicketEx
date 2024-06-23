import { Component } from '@angular/core';
import { CcaaService } from '../../../../../servicios/ccaa.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-ccaa',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-ccaa.component.html',
  styleUrl: './crear-ccaa.component.scss'
})
export class CrearCcaaComponent {

  comunidad: any = {
    nombre: ''
  }

  constructor(private servicio: CcaaService, private router: Router) { }

  formularioComunidad = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(64)])
  });
  submitted: boolean = false;

  alertConfirmCrear: boolean = false;
  alertErrorCrear: boolean = false;

  enviar() {
    this.submitted = true;
    const valores = this.formularioComunidad.value
    if (this.formularioComunidad.invalid) {
      return
    } else {
      const newCom = {
        nombre: valores.nombre
      }

      this.servicio.crearComunidad(newCom).subscribe(
        (result: any) => {
          console.log(result);
          this.alertConfirmCrear = true;
          setTimeout(() => {
            this.router.navigate(['admin/ccaa/mostrar']);
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
