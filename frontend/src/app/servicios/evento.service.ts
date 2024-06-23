import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { servidorImg } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  url = `${environment.apiRestUrl}/evento`
  urlSubirEv= `${servidorImg.urlServidor}/subirImgEv.php`

  constructor(private http: HttpClient) { }
   //GET
   listarEventos(){
    return this.http.get(`${this.url}/listado`);
  }

  getEvento(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  //POST
  crearEvento(evento: any) {
    return this.http.post(`${this.url}`, evento);
  }
  //PUT
  actualizarEvento(id: number, evento: any) {
    return this.http.put(`${this.url}/actualizar/${id}`, evento);
  }
  //DELETE
  eliminarEvento(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
  //SUBIR IMG AL SERVIDOR
  subirImg(img: any) {
    return this.http.post(`${this.urlSubirEv}`, img);
  }
}
