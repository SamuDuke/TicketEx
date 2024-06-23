import { Component } from '@angular/core';
import { ProvinciaService } from '../../../../../servicios/provincia.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CcaaService } from '../../../../../servicios/ccaa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-provincia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-provincia.component.html',
  styleUrl: './crear-provincia.component.scss'
})
export class CrearProvinciaComponent {

  comunidades: any

  constructor(private servicio: ProvinciaService, private ccaaService: CcaaService, private router: Router) {
    this.ccaaService.listarComunidades().subscribe(result => {
      this.comunidades = result
    })
  }

  formularioProvincia = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    comunidad: new FormControl('', [Validators.required])
  });
  submitted: boolean = false;

  alertConfirmCrear: boolean = false;
  alertErrorCrear: boolean = false;

  enviar() {
    this.submitted = true;
    const valores = this.formularioProvincia.value
    if (this.formularioProvincia.invalid) {
      return
    } else {
      const newPro = {
        nombre: valores.nombre,
        comunidadAutonoma: {
          idccaa: parseInt(valores.comunidad!)
        }
      }
      this.servicio.crearProvincia(newPro).subscribe(
        (result: any) => {
          console.log(result);
          this.alertConfirmCrear = true;
          setTimeout(() => {
            this.router.navigate(['admin/provincia/mostrar']);
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
