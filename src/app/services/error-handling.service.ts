import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private snackBar: MatSnackBar) { }

  handleHttpError(error: any): void {
    console.log(error);
    if (error.status != 200) {
      this.showSnackbar(`Recurso no encontrado`);
    }
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'error-snackbar'
    });
  }
}
