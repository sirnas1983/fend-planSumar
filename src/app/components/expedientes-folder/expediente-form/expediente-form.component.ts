import { Component, OnDestroy } from '@angular/core';
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
export class ExpedienteFormComponent implements OnDestroy {
  endpoint: string = 'expedientes';
  efectoresEndpoint: string = 'efectores';
  expediente!: Expediente;
  isLoading: boolean = false;
  efectores: Efector[] = [];
  expedienteForm: FormGroup;
  expedienteDataSubscription: Subscription | undefined;
  cargandoEfectores: boolean = false;

  constructor(
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService,
    private expedienteData: ExpedienteDataService,
    private location: Location,
    private fb: FormBuilder,
    private efectorData: EfectorDataService,
  ) {
    const today = new Date().toISOString().slice(0, 10);
    this.expedienteForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      numero: ['', Validators.required],
      efectorDTO: [null, Validators.required], // Inicializamos con null
      montoSolicitado: ['', Validators.required],
      fechaExpediente: [today, Validators.required],
      descripcion: [''],
    });

    this.expedienteData.currentExpediente.subscribe(data => {
      this.expediente = data;
    });

    this.efectorData.currentListaEfectores.subscribe(data => {
      this.cargandoEfectores = true;
      if (data && data.length > 0) {
        this.efectores = data;
        this.cargandoEfectores = false;
        const efectorCuie = this.expediente?.efectorDTO?.cuie;
        const selectedEfector = this.efectores.find(ef => ef.cuie === efectorCuie);
        if (selectedEfector) {
          this.expedienteForm.get('efectorDTO')?.setValue(selectedEfector);
        }
      } else {
        this.efectorData.updateEfectores();
      }
    });

    this.expedienteDataSubscription = this.expedienteData.currentExpediente.subscribe(data => {
      if (data) {
        this.expediente = data;
        this.expedienteForm.patchValue(data);
        this.expedienteForm.get('id')?.disable();
      }
    });
  }

  ngOnDestroy(): void {
    this.expedienteDataSubscription?.unsubscribe();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.expedienteForm.valid) {
      // Antes de enviar el formulario, asignar el valor del efector seleccionado
      const selectedEfectorCuie = this.expedienteForm.get('efectorDTO')?.value;
      const selectedEfector = this.efectores.find(ef => ef.cuie === selectedEfectorCuie);
      if (selectedEfector) {
        this.expedienteForm.get('efectorDTO')?.setValue(selectedEfector);
      }

      this.expedienteForm.get('id')?.enable();
      this.expediente = this.expedienteForm.value;
      this.expediente.auditorDTO = {
        id: '',
        fechaCreacion: '',
        fechaModificacion: '',
        creadoPor: '',
        modificadoPor: ''
      };
      if (this.expedienteForm.get("id")?.value === '') {
        this.apiService.postData(this.endpoint, this.expediente)
          .subscribe(
            (data: any) => {
              this.isLoading = false;
              this.efectorData.fetchEfectorByCuie(this.expediente.efectorDTO.cuie)
              this.expedienteData.updateExpedientes();
              this.expedienteData.changeExpediente(this.expediente);
              this.resetForm();
              this.location.back();
            },
            error => {
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
              this.expedienteData.updateExpedientes();
              this.efectorData.fetchEfectorByCuie(this.expediente.efectorDTO.cuie)
              this.expedienteData.changeExpediente(this.expediente);
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
