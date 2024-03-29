import { Component } from '@angular/core';
import { Efector } from '../../../interfaces/efector';
import { Expediente } from '../../../interfaces/expediente';
import { EfectorDataService } from '../../../services/efector-data.service';
import { AuthService } from '../../../services/auth.service';
import { ExpedienteDataService } from '../../../services/expediente-data.service';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { API_EXPEDIENTES } from '../../../constants/constants';

@Component({
  selector: 'app-expedientes-table',
  templateUrl: './expedientes-table.component.html',
  styleUrl: './expedientes-table.component.css'
})
export class ExpedientesTableComponent {
  efector!: Efector;
  expedientes: Expediente[] = [];
  cuie: string = '';
  isAdmin: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private efectorData: EfectorDataService,
    private authService: AuthService,
    private expedienteData: ExpedienteDataService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.efectorData.currentEfector.subscribe(data => {
      this.isLoading = true;
      this.cuie = data.cuie;
      this.efector = data;
      this.expedienteData.fetchExpedientesPorCuie(this.cuie).pipe(
        catchError(error => {
          this.errorMessage = 'Error al cargar expedientes.';
          return throwError(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe((data: any) => {
        // Obtener expedientes de la respuesta
        this.expedientes = data.data;
        // Ordenar expedientes por fecha de expediente
        this.expedientes.sort((a, b) => new Date(a.fechaExpediente).getTime() - new Date(b.fechaExpediente).getTime());
      });
    });
    this.authService.isAdmin$.subscribe((data: boolean) => {
      this.isAdmin = data;
    })
  }

  agregarExpediente() {
    const expediente: Expediente = {
      id: '',
      nombre: '',
      numero: '',
      montoSolicitado: 0,
      descripcion: '',
      efectorDTO: this.efector,
      auditorDTO: {
        creadoPor: '',
        fechaCreacion: '',
        fechaModificacion: '',
        modificadoPor: '',
        id: ''
      },
      fechaExpediente: new Date().toISOString().slice(0, 10)
    }
    this.expedienteData.changeExpediente(expediente);
    this.router.navigateByUrl('/dashboard/expedientes/crear')
  }

  verExpediente(expediente: Expediente) {
    this.expedienteData.changeExpediente(expediente);
    this.router.navigateByUrl('/dashboard/expedientes/detalle')
  }

  editarExpediente(expediente: Expediente) {
    this.expedienteData.changeExpediente(expediente);
    this.router.navigateByUrl('/dashboard/expedientes/modificar')
  }

  borrarExpediente(expediente: Expediente) {
    this.apiService.deleteData(API_EXPEDIENTES, expediente).subscribe(data => {
      console.log(data);
    })
  }

}
