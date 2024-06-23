import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  url = `${environment.apiRestUrl}/provincia`

  constructor(private http: HttpClient) { }
  //GET
  listarProvincias() {
    return this.http.get(`${this.url}/listado`);
  }

  getProvincia(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  //POST
  crearProvincia(provincia: any) {
    return this.http.post(`${this.url}`, provincia);
  }
  //PUT
  actualizarProvincia(id: number, provincia: any) {
    return this.http.put(`${this.url}/actualizar/${id}`, provincia);
  }
  //DELETE
  eliminarProvincia(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
}
