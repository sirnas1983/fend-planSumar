import { Component, OnInit } from '@angular/core';
import { Expediente } from '../../../interfaces/expediente';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ExpedienteDataService } from '../../../services/expediente-data.service';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {

  cantExpedientes: number = 0;
  expedientesOriginal: Expediente[] = [];
  expedientes: Expediente[] = [];
  isAdmin: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService, private expedienteData: ExpedienteDataService) { }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((data: boolean) => {
      this.isAdmin = data;
    })
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.expedienteData.updateExpedientes();
    this.expedienteData.currentListaExpediente.subscribe((data: any) => {
      if (data.length>0) {
        this.expedientesOriginal = data;
        this.expedientes = data;
        this.isLoading = false;
      }
    });
  }

  isRouteActive(): boolean {
    return this.router.url === '/dashboard/expedientes';
  }

  filtrarLista(event: any): void {
    const busqueda = (event.target as HTMLInputElement)?.value.trim().toLowerCase();
    if (busqueda === '') {
      this.expedientes = this.expedientesOriginal;
    } else {
      this.expedientes = this.expedientesOriginal.filter(item =>
        (item.numero && item.numero.toLowerCase().includes(busqueda)) ||
        (item.nombre && item.nombre.toLowerCase().includes(busqueda)) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(busqueda)) ||
        (item.efector.cuie.toLowerCase().includes(busqueda))
      );
    }
  }
  

  verExpediente(expediente: Expediente) {
    this.expedienteData.changeExpediente(expediente);
    this.router.navigateByUrl('/dashboard/expedientes/detalle');
  }

  editarExpediente(expediente: Expediente) {
    this.expedienteData.changeExpediente(expediente);
    this.router.navigateByUrl('/dashboard/expedientes/modificar');
  }

  public agregarExpediente() {
    const expediente: Expediente = {
      id: '',
      nombre: '',
      numero: '',
      efector: {
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
    }
    this.expedienteData.changeExpediente(expediente);
    this.router.navigateByUrl('/dashboard/expedientes/modificar');
  }
}
