import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {}

  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  setToken(token: string) {
    sessionStorage.setItem('jwtToken', token);
  }

  removeToken(){
    sessionStorage.removeItem('jwtToken');
  }

  getUsernameFromToken(): string {
    const token = localStorage.getItem('jwtToken');
    return 'username_here';
  }
}