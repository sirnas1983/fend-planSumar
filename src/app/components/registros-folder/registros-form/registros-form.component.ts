import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroDataService } from '../../../services/registro-data.service';
import { Registro } from '../../../interfaces/registro';
import { ApiService } from '../../../services/api.service';
import { ErrorHandlingService } from '../../../services/error-handling.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Efector } from '../../../interfaces/efector';
import { EfectorDataService } from '../../../services/efector-data.service';
import { API_REGISTROS } from '../../../constants/constants';

@Component({
  selector: 'app-registros-form',
  templateUrl: './registros-form.component.html',
  styleUrls: ['./registros-form.component.css']
})
export class RegistrosFormComponent implements OnDestroy {

  endpoint: string = API_REGISTROS;
  registro!: Registro;
  isLoading: boolean = false;
  registroForm!: FormGroup;
  registroDataSubscription: Subscription | undefined;
  tipoRegistroOptions : string[];
  efectores : Efector[] = [];

  constructor(
    private registroData: RegistroDataService,
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService,
    private location: Location,
    private fb: FormBuilder,
    private efectorData : EfectorDataService
  ) {
    this.tipoRegistroOptions  = ['DEBE', 'HABER'];
    this.initForm();
    this.efectorData.currentListaEfectores.subscribe( data =>{
      this.isLoading = true;
      if(data){
      this.efectores = data;
      }
      this.isLoading = false;
    }) 
    this.registroDataSubscription = this.registroData.currentRegistro.subscribe(data => {
      if (data) {
        this.registro = data;
        this.registroForm.patchValue(data);
        
      } 
    });
    this.efectorData.currentEfector.subscribe(data => {
      if (data){
        this.registroForm.get('efectorCuie')?.setValue(data.cuie);
      }
    })
  }

  private initForm(): void {
    const today = new Date().toISOString().slice(0, 10);
    this.registroForm = this.fb.group({
      id: [''], 
      fecha: [today, Validators.required],
      monto: ['', Validators.required],
      detalle: ['', Validators.required],
      tipoRegistro: ['', Validators.required],
      efectorCuie: ['', Validators.required],
      descripcion: ['']
    });
    this.registroForm.get('id')?.disable();
  }

  ngOnDestroy(): void {
    this.registroDataSubscription?.unsubscribe();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.registroForm.valid) {
      this.registroForm.get('id')?.enable();
      this.registro = this.registroForm.value;
      if (this.registroForm.get("id")?.value === '') {
        this.apiService.postData(this.endpoint, this.registro)
          .subscribe(
            (data: any) => {
              this.efectorData.updateEfectores();
              this.efectorData.fetchEfectorByCuie(this.registro.efectorCuie);
              this.registroData.updateRegistros();
              this.registroData.changeRegistro(this.registro);
              this.resetForm();
              this.isLoading = false;
              this.location.back();
            },
            error => {
              this.errorHandlingService.handleHttpError(error);
              this.isLoading = false;
            }
          )
      } else {
        this.apiService.putData(this.endpoint, this.registro)
          .subscribe(
            (data: any) => {
              this.efectorData.updateEfectores();
              this.efectorData.fetchEfectorByCuie(this.registro.efectorCuie);
              this.registroData.updateRegistros();
              this.registroData.changeRegistro(this.registro);
              this.isLoading = false;
              this.resetForm();
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
    this.registroForm.reset();
  }
}
