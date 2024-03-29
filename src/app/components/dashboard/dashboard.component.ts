import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { API_LOGOUT, API_USUARIOS } from '../../constants/constants';
import { EfectorDataService } from '../../services/efector-data.service';
import { ExpedienteDataService } from '../../services/expediente-data.service';
import { ResolucionDataService } from '../../services/resolucion-data.service';
import { UsuarioDataService } from '../../services/usuario-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: String = '';
  rol: string = '';
  userEndpoint: string = API_USUARIOS;
  logoutEndpoint: string = API_LOGOUT;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private efectorData: EfectorDataService,
    private expedienteData: ExpedienteDataService,
    private resolucionData: ResolucionDataService,
    private usuarioData: UsuarioDataService) { }

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

  cerrarSesion() {
    this.apiService.postData(`${this.userEndpoint}/${this.logoutEndpoint}`, '').subscribe(data => {
      this.router.navigateByUrl('')
    })
  }

  navigateTo(route: string, action: string): void {
    switch (action) {
      case 'efectores':
        this.efectorData.updateEfectores();
        break;
      case 'expedientes':
        this.expedienteData.updateExpedientes();
        break;
      case 'resoluciones':
        this.resolucionData.updateResoluciones();
        break;
      case 'usuarios':
        this.usuarioData.updateUsuarios();
        break;
      default:
        break;
    }

    // Navegar a la ruta
    this.router.navigateByUrl(route);
  }
}
