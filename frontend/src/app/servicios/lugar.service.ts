import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  url = `${environment.apiRestUrl}/lugar`

  constructor(private http: HttpClient) { }
  //GET
  listarLugares() {
    return this.http.get(`${this.url}/listado`);
  }

  getLugar(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  //POST
  crearLugar(lugar: any) {
    return this.http.post(`${this.url}`, lugar);
  }
  //PUT
  actualizarLugar(id: number, lugar: any) {
    return this.http.put(`${this.url}/actualizar/${id}`, lugar);
  }
  //DELETE
  eliminarLugar(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
}
