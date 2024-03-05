import { HttpClient } from "@angular/common/http";
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
  public isAdmin$ : Observable<boolean> = this.isAdminSubject.asObservable();
  private userEmail : BehaviorSubject<String> = new BehaviorSubject<String>('');
  public userEmail$ : Observable<String> = this.userEmail.asObservable();

  constructor(private http: HttpClient, private tokenService : TokenService, private apiService : ApiService) {}

  getUserRoles(): string[] {
    const token = this.tokenService.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.roles.includes("ROLE_ADMIN")){
        this.isAdminSubject.next(true);
        // Correct assignment using next() method
      } else {
        this.isAdminSubject.next(false);
      }
      console.log(decodedToken);
      this.userEmail.next(decodedToken.sub);
      return decodedToken.roles || [];
    }
    return [];
  }
  


  login(credentials: any): Observable<any> {
    // Send login request to your backend API
    return this.apiService.postData('users/authenticate', credentials)
      .pipe(
        tap((response : any) => {
          const jwtToken = response.token;
          if (jwtToken) {
            this.tokenService.setToken(jwtToken);
            this.getUserRoles();
          }
        })
      );
  }
  

  logout() {
    this.tokenService.removeToken();
    // Perform logout actions, e.g., clear token from session storage
    this.isAdminSubject.next(false);
    return this.apiService.postData(`/users/logout`,'');
  }

  isAuthenticated(): boolean {
    // Check if token exists in session storage
    return !!this.tokenService.getToken();
  }
}