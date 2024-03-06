import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials).subscribe(
      () => {
        this.router.navigate(['/welcome']); 
      },
      error => {
        this.snackBar.open('Nombre de usuario o contraseña incorrectos', '', {
          duration: 2000,
          panelClass: ['custom-snackbar', 'snackbar-error'],
        });

      }
    );
  }
}
