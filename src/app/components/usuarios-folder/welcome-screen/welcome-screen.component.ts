import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent {
  username: String = '';

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.userEmail$.subscribe((data: String) => {
      this.username = data;
    }); 
  }


}
