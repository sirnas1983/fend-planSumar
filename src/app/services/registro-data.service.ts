import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Registro } from '../interfaces/registro';
import { ApiService } from './api.service';
import { API_REGISTROS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})

export class RegistroDataService {
  private registroSource = new BehaviorSubject<Registro | null>(null);
  currentRegistro = this.registroSource.asObservable();

  private listaRegistrosSource = new BehaviorSubject<Registro[] | null>(null);
  currentListaRegistros = this.listaRegistrosSource.asObservable();

  constructor(private apiService: ApiService) { }

  changeRegistro(registro: Registro | null) {
    this.registroSource.next(registro);
  }

  changeListaRegistros(listaRegistros: Registro[] | null) {
    this.listaRegistrosSource.next(listaRegistros);
  }

  updateRegistros() {
    this.apiService.fetchData(API_REGISTROS).subscribe(
      (data: any) => {
        this.changeListaRegistros(data);
      },
      error => {
        console.error('Error al actualizar registros:', error);
      }
    );
  }
}
