import { Component, OnInit } from '@angular/core';
import { ResolucionDataService } from '../../../services/resolucion-data.service';
import { Resolucion } from '../../../interfaces/resolucion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resolucion-detalle',
  templateUrl: './resolucion-detalle.component.html',
  styleUrls: ['./resolucion-detalle.component.css']
})
export class ResolucionDetalleComponent implements OnInit {

  currentResolucion: Resolucion | undefined;
  hasResolucion: boolean = false;

  constructor(private resolucionDataService: ResolucionDataService, private router:Router) { }

  ngOnInit(): void {
    this.resolucionDataService.currentResolucion.subscribe((resolucion:any) => {
      this.currentResolucion = resolucion;
      this.hasResolucion = !!resolucion;
    });
  }

  editarResolucion(resolucion: Resolucion | undefined): void {
this.router.navigateByUrl('/dashboard/resoluciones/modificar')  }

}
