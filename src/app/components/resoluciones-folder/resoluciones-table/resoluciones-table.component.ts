import { Component } from '@angular/core';
import { Efector } from '../../../interfaces/efector';
import { Resolucion } from '../../../interfaces/resolucion';
import { EfectorDataService } from '../../../services/efector-data.service';
import { AuthService } from '../../../services/auth.service';
import { ResolucionDataService } from '../../../services/resolucion-data.service';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { API_RESOLUCIONES } from '../../../constants/constants';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-resoluciones-table',
  templateUrl: './resoluciones-table.component.html',
  styleUrls: ['./resoluciones-table.component.css']
})
export class ResolucionesTableComponent {
  efector!: Efector;
  resoluciones: Resolucion[] = [];
  cuie: string = '';
  isAdmin: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private efectorData: EfectorDataService,
    private authService: AuthService,
    private resolucionData: ResolucionDataService,
    private router: Router,
    private apiService : ApiService
  ) {
    this.efectorData.currentEfector.subscribe(data => {
      this.isLoading = true;
      this.cuie = data.cuie;
      this.efector = data;
      this.resolucionData.fetchResolucionesPorCuie(this.cuie).pipe(
        catchError(error => {
          this.errorMessage = 'Error al cargar resoluciones.';
          return throwError(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe((data: any) => {
        if (data && data.length > 0) {
          this.resoluciones = data;
          this.resoluciones.sort((a, b) => new Date(a.fechaResolucion).getTime() - new Date(b.fechaResolucion).getTime());
        }
      });
    });
    this.authService.isAdmin$.subscribe((data: boolean) => {
      this.isAdmin = data;
    });
  }

  agregarResolucion() {
    const resolucion: Resolucion = {
      id: '',
      nombre: '',
      numero: '',
      expedienteDTO: {
        id: '',
        nombre: '',
        numero: '',
        efectorDTO: {
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
        },
        montoSolicitado: 0,
        fechaExpediente: '',
        auditorDTO: {
          id: '',
          creadoPor: '',
          modificadoPor: '',
          fechaCreacion: '',
          fechaModificacion: ''
        },
        descripcion: ''
      },
      montoOtorgado: 0,
      fechaResolucion: new Date().toISOString().slice(0, 10),
      auditorDTO: {
        id: '',
        creadoPor: '',
        modificadoPor: '',
        fechaCreacion: '',
        fechaModificacion: ''
      },
      descripcion: '',
      isFondosRendidos: false
    };
    this.resolucionData.changeResolucion(resolucion);
    this.router.navigateByUrl('/dashboard/resoluciones/crear');
  }

  verResolucion(resolucion: Resolucion) {
    this.resolucionData.changeResolucion(resolucion);
    this.router.navigateByUrl('/dashboard/resoluciones/detalle');
  }

  editarResolucion(resolucion: Resolucion) {
    this.resolucionData.changeResolucion(resolucion);
    this.router.navigateByUrl('/dashboard/resoluciones/modificar');
  }

  borrarExpediente(resolucion: Resolucion) {
    this.apiService.deleteData(API_RESOLUCIONES, resolucion).subscribe(data => {
      console.log(data);
    })
  }
}