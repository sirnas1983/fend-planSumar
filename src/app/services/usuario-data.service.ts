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

  changeUsuario(usuario: Usuario | null) {
    this.usuarioSource.next(usuario);
  }

  changeListaUsuarios(listaUsuarios: Usuario[] | null) {
    this.listaUsuariosSource.next(listaUsuarios);
  }

  updateUsuarios() {
    this.apiService.fetchData(API_USUARIOS).subscribe(
      (data: any) => {
        this.changeListaUsuarios(data);
      },
      error => {
        console.error('Error al actualizar usuarios:', error);
      }
    );
  }

  fetchUsuarioById(id : string){
    return this.apiService.fetchData(`${API_USUARIOS}?id=${id}`);
  }
}
