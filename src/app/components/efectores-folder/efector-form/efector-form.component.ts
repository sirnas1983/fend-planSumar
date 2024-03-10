import { Component } from '@angular/core';
import { EfectorDataService } from '../../../services/efector-data.service';
import { Efector } from '../../../interfaces/efector';
import { ApiService } from '../../../services/api.service';
import { ErrorHandlingService } from '../../../services/error-handling.service';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Regiones } from '../../../interfaces/regions';

@Component({
  selector: 'app-efector-form',
  templateUrl: './efector-form.component.html',
  styleUrls: ['./efector-form.component.css']
})
export class EfectorFormComponent {

  endpoint: string = 'efectores';
  efector!: Efector;
  isLoading: boolean = false;
  efectorForm: FormGroup;
  efectorDataSubscription: Subscription | undefined;
  regions = Object.values(Regiones);


  constructor(
    private efectorData: EfectorDataService,
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.efectorForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      cuie: ['', Validators.required],
      region: ['', Validators.required],
      auditorDTO: this.fb.group({
        id: [''],
        creadoPor: [''],
        modificadoPor: [''],
        fechaCreacion: [''],
        fechaModificacion: ['']
      }),
      totalHaber: [0],
      totalDebe: [0],
      saldo: [0],
      descripcion: ['']
    });

    this.efectorForm.get('id')?.disable();
    this.efectorDataSubscription = this.efectorData.currentEfector.subscribe(data => {
      console.log(data);
      this.efector = data;
      this.efectorForm.patchValue(data); // Patch the form with received data
    });
  }

  ngOnDestroy(): void {
    this.efectorDataSubscription?.unsubscribe();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.efectorForm.valid) {
      // Actualiza el objeto efector original con los valores del formulario
      this.efectorForm.get('id')?.enable();
      this.efector = this.efectorForm.value;
      if (this.efectorForm.get("id")?.value === '') {
        this.apiService.postData(this.endpoint, this.efector)
          .subscribe(
            (data: any) => {
              this.efectorData.updateEfectores();
              this.resetForm();
              this.isLoading = false;
              this.location.back();
            },
            error => {
              console.log("error: ", error);
              this.errorHandlingService.handleHttpError(error);
              this.isLoading = false;

            }
          )
      } else {
        this.apiService.putData(this.endpoint, this.efector)
          .subscribe(
            (data: any) => {
              this.efectorData.updateEfectores();
              this.resetForm();
              this.isLoading = false;
              this.location.back();
            },
            error => {
              // Handle error
              this.errorHandlingService.handleHttpError(error);
              this.isLoading = false;

            }
          );
      }
    }
  }

  resetForm() {
    this.efectorForm.reset();
  }
}
