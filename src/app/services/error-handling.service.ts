import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private snackBar: MatSnackBar) { }

  handleHttpError(error: any): void {
    if (error.status != 200 && error.status != 404) {
      this.showSnackbar(error.error.message);
    }
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'snackbar-error'
    });
  }
}
