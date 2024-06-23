import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EntradaService } from '../../../../../servicios/entrada.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Entrada } from '../../../../../modelos/entrada';
import { EventoService } from '../../../../../servicios/evento.service';
import { UsuarioService } from '../../../../../servicios/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-entrada',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-entrada.component.html',
  styleUrl: './editar-entrada.component.scss'
})
export class EditarEntradaComponent implements OnInit {
  entradaID!: string;
  datosEntrada: Entrada = new Entrada();
  eventos: any;
  usuarios: any;

  formularioEntrada = new FormGroup({
    precio: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required]),
    evento: new FormControl('', [Validators.required])
  });
  submitted: boolean = false;
  formData = new FormData();
  nombreImg: any;
  srcPreview: any = '';

  alertConfirmEditar: boolean = false;
  alertErrorEditar: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private servicio: EntradaService, private eventoService: EventoService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.eventoService.listarEventos().subscribe(result => {
      this.eventos = result
    })

    this.usuarioService.listarUsuarios().subscribe(result => {
      this.usuarios = result
    })

    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.entradaID = parametros.get("id")!;
    })
    this.cargarEntrada(parseInt(this.entradaID))
  }

  cargarEntrada(id: number) {
    this.servicio.getEntrada(id).subscribe((result: any) => {
      this.datosEntrada.identrada = result.identrada;
      this.datosEntrada.estado = result.estado;
      this.datosEntrada.precio = result.precio;
      this.datosEntrada.img = result.img;
      this.datosEntrada.idevento = result.evento.idevento;
      this.datosEntrada.idusuario = result.usuario.idusuario;
      this.rellenarForm();
    })
  }

  rellenarForm() {
    this.formularioEntrada = new FormGroup({
      precio: new FormControl(this.datosEntrada.precio.toString(), [Validators.required]),
      estado: new FormControl(this.datosEntrada.estado, [Validators.required]),
      img: new FormControl('', [Validators.required]),
      usuario: new FormControl(this.datosEntrada.idusuario.toString(), [Validators.required]),
      evento: new FormControl(this.datosEntrada.idevento.toString(), [Validators.required])
    });
    this.nombreImg = this.datosEntrada.img;
  }

  enviar() {
    this.submitted = true;
    const valores = this.formularioEntrada.value;
    if (this.formularioEntrada.invalid) {
      return
    } else {
      if (valores.usuario != null && valores.evento != null) {
        this.servicio.subirImg(this.formData).subscribe(
          (result: any) => {
            console.log('Imagen de entrada subida correctamente', this.nombreImg);
          },
          (error: any) => {
            console.log(error);
          });
        const newEnt = {
          precio: parseFloat(valores.precio!),
          estado: valores.estado,
          img: this.nombreImg,
          usuario: {
            idusuario: parseInt(valores.usuario)
          },
          evento: {
            idevento: parseInt(valores.evento)
          }
        };
        this.servicio.actualizarEntrada(parseInt(this.entradaID), newEnt).subscribe(
          (result: any) => {
            console.log(result)
            this.alertConfirmEditar = true;
            setTimeout(() => {
              this.router.navigate(['admin/entrada/mostrar']);
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    this.formData.append('img', file);
    const datos = {
      editar: true,
      nombreImg: this.nombreImg
    }
    this.formData.append('datos', JSON.stringify(datos));
    // Comento la siguiente fila para que aunque se cambie la img de la entrada se guarde el mismo nombre y asi se sobreescriba
    // this.nombreImg = file.name
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.srcPreview = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  }

  limpiar() {
    this.srcPreview = ''
  }
}
