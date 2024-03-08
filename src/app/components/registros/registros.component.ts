import { Component } from '@angular/core';
import { Registro } from '../../interfaces/registro';
import { EfectorDataService } from '../../services/efector-data.service';
import { ApiService } from '../../services/api.service';
import { Efector } from '../../interfaces/efector';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css'
})
export class RegistrosComponent {

  efector! : Efector;
  registros : Registro[] = [];
  endpoint : string = '';
  cuie = '';

  constructor(private efectorData: EfectorDataService, private apiService : ApiService){
    
    this.efectorData.currentEfector.subscribe(data =>{ 
      this.cuie = data.cuie;
      this.efector = data;
      this.endpoint = `registros?cuie=${data.cuie}`;
      this.apiService.fetchData(this.endpoint).subscribe((data: any) => {
          // Obtener registros de la respuesta
          this.registros = data.data;
          // Ordenar registros por fecha
          this.registros.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      });
  });
  }

  agregarRegistro(){
    return null;
  }
  
}