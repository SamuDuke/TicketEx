import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../../../../servicios/provincia.service';
import { CcaaService } from '../../../../../servicios/ccaa.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Provincia } from '../../../../../modelos/provincia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-provincia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-provincia.component.html',
  styleUrl: './editar-provincia.component.scss'
})
export class EditarProvinciaComponent implements OnInit {
  provinciaID!: string;
  datosProvincia: Provincia = new Provincia();
  comunidades: any;

  formularioProvincia = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    comunidad: new FormControl('', [Validators.required])
  });
  submitted: boolean = false;

  alertConfirmEditar: boolean = false;
  alertErrorEditar: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private servicio: ProvinciaService, private ccaaService: CcaaService, private router: Router) {
    this.ccaaService.listarComunidades().subscribe(result => {
      this.comunidades = result
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.provinciaID = parametros.get("id")!;
    })
    this.cargarProvincia(parseInt(this.provinciaID))
  }

  cargarProvincia(id: number) {
    this.servicio.getProvincia(id).subscribe((result: any) => {
      this.datosProvincia.idprovincia = result.idprovincia;
      this.datosProvincia.nombre = result.nombre;
      this.datosProvincia.idccaa = result.comunidadAutonoma.idccaa;

      this.rellenarForm()
    })
  }

  rellenarForm() {
    this.formularioProvincia = new FormGroup({
      nombre: new FormControl(this.datosProvincia.nombre, [Validators.required, Validators.maxLength(64)]),
      comunidad: new FormControl(this.datosProvincia.idccaa.toString(), [Validators.required])
    });
  }

  enviar() {
    this.submitted = true;
    const valores = this.formularioProvincia.value;
    if (this.formularioProvincia.invalid) {
      return
    } else {
      const newProvincia = {
        nombre: valores.nombre,
        comunidadAutonoma: {
          idccaa: parseInt(valores.comunidad!)
        }
      };

      this.servicio.actualizarProvincia(parseInt(this.provinciaID), newProvincia).subscribe(
        (result: any) => {
          console.log(result)
          this.alertConfirmEditar = true;
          setTimeout(() => {
            this.router.navigate(['admin/provincia/mostrar']);
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
