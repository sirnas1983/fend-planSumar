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
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.isLoading = true;
    const credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials).subscribe(
      () => {     
        setTimeout(() => {
          this.isLoading=false;
          this.router.navigate(['/dashboard']); 
         }, 1750); 
      },
      error => {
        this.snackBar.open('Nombre de usuario o contraseña incorrectos', '', {
          duration: 2000,
          panelClass: ['custom-snackbar', 'snackbar-error'],
        });
        this.isLoading=false;
      }
    );
  }
}
