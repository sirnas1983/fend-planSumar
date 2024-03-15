import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ErrorHandlingService } from '../../../services/error-handling.service';
import { Expediente } from '../../../interfaces/expediente';
import { Resolucion } from '../../../interfaces/resolucion';
import { ResolucionDataService } from '../../../services/resolucion-data.service';
import { ExpedienteDataService } from '../../../services/expediente-data.service';
import { API_RESOLUCIONES } from '../../../constants/constants';

@Component({
  selector: 'app-resolucion-form',
  templateUrl: './resolucion-form.component.html',
  styleUrls: ['./resolucion-form.component.css']
})
export class ResolucionFormComponent implements OnInit {

  endpoint: string = API_RESOLUCIONES;
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
    const today = new Date().toISOString().slice(0, 10);
    this.resolucionForm = this.fb.group({
      id: [''],
      numero: ['', Validators.required],
      nombre: ['', Validators.required],
      expedienteDTO: ['', Validators.required],
      montoOtorgado: ['', Validators.required],
      fechaResolucion: [today, Validators.required],
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
              this.resetForm();
              this.isLoading = false;
              this.resolucionData.updateResoluciones();
              this.resolucionData.changeResolucion(this.resolucion);
              this.location.back();
            },
            error => {
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
              this.resolucionData.changeResolucion(this.resolucion);
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
