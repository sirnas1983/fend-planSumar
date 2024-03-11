import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { ErrorHandlingService } from '../../../services/error-handling.service';
import { Efector } from '../../../interfaces/efector';
import { Expediente } from '../../../interfaces/expediente';
import { ExpedienteDataService } from '../../../services/expediente-data.service';
import { EfectorDataService } from '../../../services/efector-data.service';

@Component({
  selector: 'app-expediente-form',
  templateUrl: './expediente-form.component.html',
  styleUrls: ['./expediente-form.component.css']
})
export class ExpedienteFormComponent implements OnInit, OnDestroy {

  endpoint: string = 'expedientes';
  efectoresEndpoint: string = 'efectores';
  expediente!: Expediente;
  isLoading: boolean = false;
  efectores: Efector[] = [];
  expedienteForm: FormGroup;
  expedienteDataSubscription: Subscription | undefined;

  constructor(
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService,
    private expedienteData: ExpedienteDataService,
    private location: Location,
    private fb: FormBuilder,
    private efectorData: EfectorDataService,
  ) {
    this.expedienteForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      numero: ['', Validators.required],
      efector: ['', Validators.required],
      montoSolicitado: ['', Validators.required],
      fechaExpediente: ['', Validators.required],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    this.expedienteDataSubscription = this.expedienteData.currentExpediente.subscribe(data => {
      if (data) {
        this.expediente = data;
        this.expedienteForm.patchValue(data);
        this.efectorData.currentListaEfectores.subscribe(data => {
          if (data !== null) {
            this.efectores = data;
          } else {
            this.apiService.fetchData(this.efectoresEndpoint).subscribe((data: any) => {
              this.efectorData.changeListaEfectores(data);
              this.efectores = data;
            })
          }
          const efector = this.expediente.efector;
          this.expedienteForm.get('efector')?.setValue(this.efectores.find(ef => ef.id === efector.id));
        });
      }
    });
    this.expedienteForm.get('id')?.disable();
  }

  ngOnDestroy(): void {
    this.expedienteDataSubscription?.unsubscribe();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.expedienteForm.valid) {
      this.expedienteForm.get('id')?.enable();
      this.expediente = this.expedienteForm.value;
      if (this.expedienteForm.get("id")?.value === '') {
        this.apiService.postData(this.endpoint, this.expediente)
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
            }
          );
      } else {
        this.apiService.putData(this.endpoint, this.expediente)
          .subscribe(
            (data: any) => {
              this.resetForm();
              this.isLoading = false;
              this.location.back();
            },
            error => {
              this.errorHandlingService.handleHttpError(error);
              this.isLoading = false;
            }
          );
      }
    }
  }

  resetForm() {
    this.expedienteForm.reset();
  }
}
