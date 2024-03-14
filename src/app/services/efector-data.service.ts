import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { API_EFECTORES } from '../constants/constants';
import { Efector } from '../interfaces/efector';

@Injectable({
  providedIn: 'root'
})
export class EfectorDataService {
  private efectorSource = new BehaviorSubject<any>(null);
  currentEfector = this.efectorSource.asObservable();

  private listaEfectoresSource = new BehaviorSubject<Efector[]>([]);
  currentListaEfectores = this.listaEfectoresSource.asObservable();

  constructor(private apiService : ApiService) { }

  changeEfector(efector: any) {
    this.efectorSource.next(efector);
  }

  changeListaEfectores(listaEfectores :any){
    this.listaEfectoresSource.next(listaEfectores);
  }

  updateEfectores(){
    this.apiService.fetchData(API_EFECTORES).subscribe((data:any)=>{
      data = data.sort((a: Efector, b: Efector) => a.region.localeCompare(b.region));
      this.changeListaEfectores(data);
    })
  }

  fetchEfectorByCuie(cuie :string){
    this.apiService.fetchData(`${API_EFECTORES}?cuie=${cuie}`).subscribe((data:any)=>{
      this.changeEfector(data[0]);
    })
  }
}
