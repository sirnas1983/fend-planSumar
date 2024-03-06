import { Component } from '@angular/core';
import { EfectorDataService } from '../../services/efector-data.service';
import { EfectorDTO } from '../../interfaces/efector';
import { ApiService } from '../../services/api.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-efector-form',
  templateUrl: './efector-form.component.html',
  styleUrls: ['./efector-form.component.css']
})
export class EfectorFormComponent {

  endpoint: string = 'efectores';
  isLoading : boolean = false;

  efector: EfectorDTO = {
    id: '',
    nombre: '',
    cuie: '',
    region: '',
    auditorDTO: {
      id: '',
      creadoPor: '',
      modificadoPor: '',
      fechaCreacion: '',
      fechaModificacion: ''
    },
    totalHaber: 0,
    totalDebe: 0,
    saldo: 0,
    descripcion: ''
  };

  constructor(
    private efectorData: EfectorDataService,
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService,
    private location: Location

  ) {
    this.efectorData.currentEfector.subscribe(data => {
      this.efector = data;
      console.log(data)
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.efector.id === '') {
      this.apiService.postData(this.endpoint, this.efector)
        .subscribe(
          (data: any) => {
            console.log("data: ", data);
            this.resetForm();
            this.isLoading = false;
            this.location.back();
          },
          error => {
            console.log("error: ", error);
            this.errorHandlingService.handleHttpError(error);
            this.isLoading = false;
            this.location.back();
          }
        )
    } else {
      this.apiService.putData(this.endpoint, this.efector)
        .subscribe(
          (data: any) => {
            this.resetForm();
            this.isLoading = false;
            this.location.back();
          },
          error => {
            // Handle error
            this.errorHandlingService.handleHttpError(error);
            this.isLoading = false;
            this.location.back();
          }
        );
    }
  }

  resetForm() {
    // Logic to reset the form
  }
}
