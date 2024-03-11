import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { ErrorHandlingService } from '../../../services/error-handling.service';
import { Expediente } from '../../../interfaces/expediente';
import { Resolucion } from '../../../interfaces/resolucion';
import { ResolucionDataService } from '../../../services/resolucion-data.service';
import { ExpedienteDataService } from '../../../services/expediente-data.service';
import { API_EXPEDIENTES } from '../../../constants/constants';

@Component({
  selector: 'app-resolucion-form',
  templateUrl: './resolucion-form.component.html',
  styleUrls: ['./resolucion-form.component.css']
})
export class ResolucionFormComponent implements OnInit {

  endpoint: string = 'resoluciones';
  resolucion!: Resolucion;
  isLoading: boolean = false;
  expedientes: Expediente[] = [];
  expediente!: Expediente | undefined;
  resolucionForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService,
    private resolucionData: ResolucionDataService,
    private location: Location,
    private fb: FormBuilder,
    private expedienteData: ExpedienteDataService,
  ) {
    this.resolucionForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      numero: ['', Validators.required],
      expedienteDTO: ['', Validators.required],
      montoOtorgado: ['', Validators.required],
      fechaResolucion: ['', Validators.required],
      descripcion: [''],
      isFondosRendidos : [false]
    });
  }

  ngOnInit(): void {
    this.resolucionData.currentResolucion.subscribe(data => {
      if (data) {
        this.resolucion = data;
        this.resolucionForm.patchValue(data);
      }
    });
    this.expedienteData.currentListaExpediente.subscribe(data => {
      this.expedientes = data;
    });
    this.expedienteData.currentExpediente.subscribe((data: any) => {
      const expediente = data;
      this.expediente = this.expedientes.find(ex => ex.id === expediente.id);
      this.resolucionForm.get('expedienteDTO')?.setValue(expediente);
    })
    this.resolucionForm.get('id')?.disable();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.resolucionForm.valid) {
      this.resolucionForm.get('id')?.enable();
      this.resolucion = this.resolucionForm.value;
      if (this.resolucionForm.get("id")?.value === '') {
        this.apiService.postData(this.endpoint, this.resolucion)
          .subscribe(
            (data: any) => {
              console.log("data: ", data);
              this.resetForm();
              this.isLoading = false;
              this.resolucionData.updateResoluciones();
              this.location.back();
            },
            error => {
              console.log("error: ", error);
              this.errorHandlingService.handleHttpError(error);
              this.isLoading = false;
            }
          );
      } else {
        this.apiService.putData(this.endpoint, this.resolucion)
          .subscribe(
            (data: any) => {
              this.resetForm();
              this.isLoading = false;
              this.resolucionData.updateResoluciones();
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
    this.resolucionForm.reset();
  }
}
