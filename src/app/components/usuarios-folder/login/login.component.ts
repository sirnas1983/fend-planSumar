import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlingService } from '../../../services/error-handling.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  finishedLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlingService
  ) { }

  login() {
    this.isLoading = true;
    const credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials).subscribe(
      data => {
        if (data.token) {
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1750);
          this.finishedLoading=true;
        }
        this.isLoading = false
      },
      error => {
        console.log(error)
        this.errorHandler.handleHttpError(error);
        this.isLoading = false;
      }
    );
  }
}
