import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: String = '';
  rol: string = '';

  constructor(private authService: AuthService, private router: Router) { }

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
}
