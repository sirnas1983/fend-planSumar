import { Injectable } from '@angular/core';
import { Expediente } from '../interfaces/expediente';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { API_EXPEDIENTES } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteDataService {
  private expedienteSource = new BehaviorSubject< any >(null);
  currentExpediente = this.expedienteSource.asObservable();

  private listaExpedienteSource = new BehaviorSubject< any >(null);
  currentListaExpediente = this.expedienteSource.asObservable();

  constructor(private apiService : ApiService) { }

  changeExpediente(expediente: Expediente) {
    this.expedienteSource.next(expediente);
  }

  changeListaExpedientes(expedientes : Expediente[]){
    this.listaExpedienteSource.next(expedientes);
  }

  updateExpedientes(){
    this.apiService.fetchData(API_EXPEDIENTES).subscribe((data:any)=>{
      this.changeListaExpedientes(data);
    })
  }
}
