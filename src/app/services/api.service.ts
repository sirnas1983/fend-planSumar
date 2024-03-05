import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROOT } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  fetchData(endpoint: string) {
    const url = `${API_ROOT}/${endpoint}`;
    return this.http.get(url);
  }

  postData(endpoint: string, body: any) {
    const url = `${API_ROOT}/${endpoint}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url, JSON.stringify(body), { headers });
  }

  putData(endpoint: string, body: any) {
    const url = `${API_ROOT}/${endpoint}`;
    return this.http.put(url, body);
  }
}