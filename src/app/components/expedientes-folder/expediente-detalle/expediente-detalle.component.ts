import { Component, OnInit } from '@angular/core';
import { ExpedienteDataService } from '../../../services/expediente-data.service';
import { ApiService } from '../../../services/api.service';
import { Resolucion } from '../../../interfaces/resolucion';
import { Expediente } from '../../../interfaces/expediente';
import { Router } from '@angular/router';
import { ResolucionDataService } from '../../../services/resolucion-data.service';

@Component({
  selector: 'app-expediente-detalle',
  templateUrl: './expediente-detalle.component.html',
  styleUrls: ['./expediente-detalle.component.css']
})
export class ExpedienteDetalleComponent implements OnInit {
  currentExpediente: any;
  showRegistros: boolean = false;
  showExpedientes: boolean = false;
  showResoluciones: boolean = false;
  endpoint: string = '';
  resolucion!: Resolucion;
  hasExpediente: boolean = false;

  constructor(private expedienteService: ExpedienteDataService, 
    private apiService: ApiService, 
    private router:Router,
    private resolucionData: ResolucionDataService) { }

  ngOnInit(): void {
    // Suscripción al observable currentExpediente
    this.expedienteService.currentExpediente.subscribe(expediente => {
      this.currentExpediente = expediente;
      this.endpoint = `resoluciones?numEx=${expediente.numero}`
      this.loadResolucion();
    });


  }

  agregarResolucion() : void{
    this.router.navigateByUrl('/dashboard/resoluciones/crear');
  }

  verResolucion(resolucion : Resolucion){
    this.resolucionData.changeResolucion(resolucion);
    this.router.navigateByUrl('/dashboard/resoluciones/detalle')
  }

  toggleResoluciones() {
    this.showResoluciones = !this.showResoluciones;
    this.showRegistros = false;
    this.showExpedientes = false;
  }

  editarExpediente(currentExpediente:Expediente){
    this.router.navigateByUrl('/dashboard/expedientes/modificar');
  }

  loadResolucion(): void {
    this.apiService.fetchData(this.endpoint).subscribe(
      (resolucion: any) => {
        console.log(resolucion);
        if (resolucion.length > 0) {
          this.resolucion = resolucion[0];
          this.hasExpediente = true; // Verificar si existe expedienteDTO
        } else {
          console.error('No se encontró la resolución');
        }
      },
      error => {
        console.error('Error al cargar la resolución:', error);
      }
    );
  }

  editarResolucion(resolucion : Resolucion){
    this.resolucionData.changeResolucion(resolucion);
    this.router.navigateByUrl('/dashboard/resoluciones/modificar')
  }
}


