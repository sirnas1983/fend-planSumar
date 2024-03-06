import { Injectable, InjectionToken } from "@angular/core";
import { jwtDecode } from "jwt-decode";

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

  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const roles = decodedToken.roles || [];
      return roles.includes("ADMIN");
    }
    return false;
  }
}