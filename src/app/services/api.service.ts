import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROOT } from '../constants/constants';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  fetchData(endpoint: string) {
    const url = `${API_ROOT}/${endpoint}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(url, { headers });
  }

  postData(endpoint: string, body: any) {
    const url = `${API_ROOT}/${endpoint}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url, body, {headers}).pipe(
      catchError((error) => {
        return throwError(error); // Pass the error to the subscriber
      })
    );
  }

  putData(endpoint: string, body: any) {
    const url = `${API_ROOT}/${endpoint}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, body, {headers}).pipe(
      catchError((error) => {
        return throwError(error); // Pass the error to the subscriber
      })
    );
  }

  deleteData(endpoint: string, body: any) {
    const url = `${API_ROOT}/${endpoint}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(url,{headers, body:body}).pipe(
      catchError((error) => {
        return throwError(error); // Pass the error to the subscriber
      })
    );
  }
}