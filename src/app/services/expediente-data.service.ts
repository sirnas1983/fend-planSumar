import { Injectable } from '@angular/core';
import { Expediente } from '../interfaces/expediente';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteDataService {
  private expedienteSource = new BehaviorSubject< any >(null);
  currentExpediente = this.expedienteSource.asObservable();

  constructor() { }

  changeExpediente(expediente: Expediente) {
    this.expedienteSource.next(expediente);
  }
}
