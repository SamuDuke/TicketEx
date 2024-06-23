import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { servidorImg } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  url = `${environment.apiRestUrl}/entrada`
  urlSubirImg= `${servidorImg.urlServidor}/subirImg.php`

  constructor(private http: HttpClient) { }
  //GET
  listarEntradas(){
    return this.http.get(`${this.url}/listado`);
  }

  getEntrada(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  //POST
  crearEntrada(entrada: any) {
    return this.http.post(`${this.url}`, entrada);
  }
  //PUT
  actualizarEntrada(id: number, entrada: any) {
    return this.http.put(`${this.url}/actualizar/${id}`, entrada);
  }
  //DELETE
  eliminarEntrada(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
  //SUBIR IMG AL SERVIDOR
  subirImg(img: any) {
    return this.http.post(`${this.urlSubirImg}`, img);
  }
}
