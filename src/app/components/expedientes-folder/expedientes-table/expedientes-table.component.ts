import { Component } from '@angular/core';
import { Efector } from '../../../interfaces/efector';
import { Expediente } from '../../../interfaces/expediente';
import { EfectorDataService } from '../../../services/efector-data.service';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { ExpedienteDataService } from '../../../services/expediente-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expedientes-table',
  templateUrl: './expedientes-table.component.html',
  styleUrl: './expedientes-table.component.css'
})
export class ExpedientesTableComponent {
  efector!: Efector;
  expedientes: Expediente[] = [];
  endpoint: string = '';
  cuie: string = '';
  isAdmin : boolean = false;

  constructor(private efectorData: EfectorDataService, 
    private apiService: ApiService, 
    private authService : AuthService, 
    private expedienteData : ExpedienteDataService,
    private router : Router) {
    this.efectorData.currentEfector.subscribe(data => {
      this.cuie = data.cuie;
      this.efector = data;
      this.endpoint = `expedientes?cuie=${data.cuie}`;
      this.apiService.fetchData(this.endpoint).subscribe((data: any) => {
        // Obtener expedientes de la respuesta
        this.expedientes = data.data;
        // Ordenar expedientes por fecha de expediente
        this.expedientes.sort((a, b) => new Date(a.fechaExpediente).getTime() - new Date(b.fechaExpediente).getTime());
      });
    });
    this.authService.isAdmin$.subscribe((data: boolean) => {
      console.log("desde exp", data);
      this.isAdmin = data;
    })
  }

  agregarExpediente(){
    return null;
  }

 
  verExpediente(expediente : Expediente){
    this.expedienteData.changeExpediente(expediente);
    this.router.navigateByUrl('/dashboard/expedientes/detalle')
  }

  editarExpediente(expediente : Expediente){
    this.expedienteData.changeExpediente(expediente);
    this.router.navigateByUrl('/dashboard/expedientes/modificar')
  }

}