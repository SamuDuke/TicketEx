import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { servidorImg } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = `${environment.apiRestUrl}/categoria`
  urlSubirCat= `${servidorImg.urlServidor}/subirImgCat.php`

  constructor(private http: HttpClient) { }
  //GET
  listarCategorias() {
    return this.http.get(`${this.url}/listado`);
  }

  getCategoria(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  //POST
  crearCategoria(categoria: any) {
    return this.http.post(`${this.url}`, categoria);
  }
  //PUT
  actualizarCategoria(id: number, categoria: any) {
    return this.http.put(`${this.url}/actualizar/${id}`, categoria);
  }
  //DELETE
  eliminarCategoria(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
  //SUBIR IMG AL SERVIDOR
  subirImg(img: any) {
    return this.http.post(`${this.urlSubirCat}`, img);
  }
}
