import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { API_USUARIOS } from '../constants/constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDataService {

  private usuarioSource = new BehaviorSubject<Usuario | null>(null);
  currentUsuario = this.usuarioSource.asObservable();

  private listaUsuariosSource = new BehaviorSubject<Usuario[] | null>(null);
  currentListaUsuarios = this.listaUsuariosSource.asObservable();

  constructor(private apiService: ApiService) { }

  changeUsuario(usuario: Usuario) {
    this.usuarioSource.next(usuario);
  }

  changeListaUsuarios(listaUsuarios: Usuario[]) {
    this.listaUsuariosSource.next(listaUsuarios);
  }

  updateUsuarios() {
    this.apiService.fetchData(API_USUARIOS).subscribe(
      (data: any) => {
        this.changeListaUsuarios(data.data);
      },
      error => {
        console.error('Error al actualizar usuarios:', error);
      }
    );
  }

  fetchUsuarioById(id : string){
    this.apiService.fetchData(`${API_USUARIOS}?id=${id}`).subscribe((data:any)=>
      this.changeUsuario(data.data));
  }
}
