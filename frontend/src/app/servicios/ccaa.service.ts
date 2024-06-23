import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CcaaService {

  url = `${environment.apiRestUrl}/ccaa`
  
  constructor(private http: HttpClient) { }
  //GET
  listarComunidades() {
    return this.http.get(`${this.url}/listado`);
  }

  getComunidad(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  //POST
  crearComunidad(comunidad: any) {
    return this.http.post(`${this.url}`, comunidad);
  }
  //PUT
  actualizarComunidad(id: number, comunidad: any) {
    return this.http.put(`${this.url}/actualizar/${id}`, comunidad);
  }
  //DELETE
  eliminarComunidad(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
}
