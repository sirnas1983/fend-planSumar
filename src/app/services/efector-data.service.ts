import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EfectorDataService {
  private efectorSource = new BehaviorSubject<any>(null);
  currentEfector = this.efectorSource.asObservable();

  constructor() { }

  changeEfector(efector: any) {
    this.efectorSource.next(efector);
  }
}
