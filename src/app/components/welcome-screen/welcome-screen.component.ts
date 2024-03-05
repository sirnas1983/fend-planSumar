import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log("Component view initialized");
    this.authService.userEmail$.subscribe((data: String) => {
      this.username = data;
    }); // Assuming you have a method to get the username from AuthService
    setTimeout(() => {
      this.router.navigate(['/dashboard']); // Redirect to the main app after 3.5 seconds
    }, 3500);
  }
}
