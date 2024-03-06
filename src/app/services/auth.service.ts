import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { TokenService } from "./token.service";
import { jwtDecode } from 'jwt-decode';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();
  private userEmailSubject: BehaviorSubject<String> = new BehaviorSubject<String>('');
  public userEmail$: Observable<String> = this.userEmailSubject.asObservable();

  constructor(private tokenService: TokenService, private apiService: ApiService) {
    // Verificar si hay un token al inicializar el servicio
    const token = this.tokenService.getToken();
    if (token) {
      this.processToken(token);
    }
  }

  login(credentials: any): Observable<any> {
    // Send login request to your backend API
    return this.apiService.postData('users/authenticate', credentials)
      .pipe(
        tap((response: any) => {
          const jwtToken = response.token;
          if (jwtToken) {
            this.tokenService.setToken(jwtToken);
            this.processToken(jwtToken);
          }
        })
      );
  }

  private processToken(token: string): void {
    const decodedToken: any = jwtDecode(token);
    const roles = decodedToken.roles || [];
    const isAdmin = roles.includes("ADMIN");
    this.isAdminSubject.next(isAdmin);
    this.userEmailSubject.next(decodedToken.sub);
  }

  logout() {
    this.tokenService.removeToken();
    // Perform logout actions, e.g., clear token from session storage
    this.isAdminSubject.next(false);
    return this.apiService.postData(`/users/logout`, '');
  }

  isAuthenticated(): boolean {
    // Check if token exists in session storage
    return this.tokenService.getToken() != null;
  }
}
