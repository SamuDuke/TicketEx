import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = `${environment.apiRestUrl}/usuario`

  constructor(private http: HttpClient) { }
   //GET
   listarUsuarios(){
    return this.http.get(`${this.url}/listado`);
  }

  getUsuario(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  //POST
  crearUsuario(usuario: any) {
    return this.http.post(`${this.url}`, usuario);
  }
  //PUT
  actualizarUsuario(id: number, usuario: any) {
    return this.http.put(`${this.url}/actualizar/${id}`, usuario);
  }
  //DELETE
  eliminarUsuario(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }

}