import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { API_RESOLUCIONES } from '../constants/constants';
import { Resolucion } from '../interfaces/resolucion';

@Injectable({
  providedIn: 'root'
})
export class ResolucionDataService {
  private resolucionSource = new BehaviorSubject<Resolucion | null>(null);
  currentResolucion = this.resolucionSource.asObservable();

  private listaResolucionesSource = new BehaviorSubject<Resolucion[] | null>(null);
  currentListaResoluciones = this.listaResolucionesSource.asObservable();

  constructor(private apiService: ApiService) { }

  changeResolucion(resolucion: Resolucion) {
    this.resolucionSource.next(resolucion);
  }

  changeListaResoluciones(resoluciones: Resolucion[]) {
    this.listaResolucionesSource.next(resoluciones);
  }

  updateResoluciones() {
    this.apiService.fetchData(API_RESOLUCIONES).subscribe((data: any) => {
      this.changeListaResoluciones(data);
      console.log(data);
    });
  }

  fetchResolucionesPorCuie(cuie: string) {
    return this.apiService.fetchData(API_RESOLUCIONES + "?cuie=" + cuie);
  }

  fetchResolucionPorNumExpediente(numExpediente: string) {
    return this.apiService.fetchData(API_RESOLUCIONES + "?numEx=" + numExpediente);
  }
}
