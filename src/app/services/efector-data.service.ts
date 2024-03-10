import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { API_EFECTORES } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EfectorDataService {
  private efectorSource = new BehaviorSubject<any>(null);
  currentEfector = this.efectorSource.asObservable();

  private listaEfectoresSource = new BehaviorSubject<any>(null);
  currentListaEfectores = this.listaEfectoresSource.asObservable();

  constructor(private apiService : ApiService) { }

  changeEfector(efector: any) {
    this.efectorSource.next(efector);
  }

  changeListaEfectores(listaEfectores :any){
    this.listaEfectoresSource.next(listaEfectores);
  }

  updateEfectores(){
    this.apiService.fetchData(API_EFECTORES).subscribe(data=>{
      this.changeListaEfectores(data);
    })
  }
}
