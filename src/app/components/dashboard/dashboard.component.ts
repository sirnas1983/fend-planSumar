import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { API_LOGOUT, API_USUARIOS } from '../../constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: String = '';
  rol: string = '';
  userEndpoint : string = API_USUARIOS;
  logoutEndpoint : string = API_LOGOUT;

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.authService.userEmail$.subscribe(username => {
      this.username = username;
    });

    this.authService.isAdmin$.subscribe(isAdmin => {
      this.rol = isAdmin ? 'ADMIN' : 'USER';
    });
  }

  isRouteActive(): boolean {
    return this.router.url === '/dashboard';
  }

  cerrarSesion(){
    this.apiService.postData(`${this.userEndpoint}/${this.logoutEndpoint}`,'').subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl('')
    })
  }
}
