import { Component, OnInit } from '@angular/core';
import { CCAA } from '../../../../../modelos/ccaa';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CcaaService } from '../../../../../servicios/ccaa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-ccaa',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-ccaa.component.html',
  styleUrl: './editar-ccaa.component.scss'
})
export class EditarCcaaComponent implements OnInit {
  comunidadID!: string
  datosComunidad: CCAA = new CCAA()

  formularioComunidad: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(64)]),
  });
  submitted: boolean = false;

  alertConfirmEditar: boolean = false;
  alertErrorEditar: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private servicio: CcaaService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.comunidadID = parametros.get("id")!;
    })
    this.cargarComunidad(parseInt(this.comunidadID))
  }

  cargarComunidad(id: number) {
    this.servicio.getComunidad(id).subscribe((result: any) => {
      this.datosComunidad.idccaa = result.idccaa;
      this.datosComunidad.nombre = result.nombre;
      this.rellenarForm();
    })
  }

  rellenarForm() {
    this.formularioComunidad = new FormGroup({
      nombre: new FormControl(this.datosComunidad.nombre, [Validators.required, Validators.maxLength(64)])
    });
  }

  enviar() {
    this.submitted = true;
    const valores = this.formularioComunidad.value;
    if (this.formularioComunidad.invalid) {
      return
    } else {
      const newCCAA: CCAA = new CCAA();

      newCCAA.idccaa = parseInt(this.comunidadID);
      newCCAA.nombre = valores.nombre;

      this.servicio.actualizarComunidad(newCCAA.idccaa, newCCAA).subscribe(
        (result: any) => {
          console.log(result)
          this.alertConfirmEditar = true;
          setTimeout(() => {
            this.router.navigate(['admin/ccaa/mostrar']);
          }, 3000);
        },
        (error: any) => {
          console.log(error);
          this.alertErrorEditar = true;
          setTimeout(() => {
            this.alertErrorEditar = false;
          }, 3000);
        });
    }
  }
}
