import { Component, OnInit } from '@angular/core';
import { ResolucionDataService } from '../../../services/resolucion-data.service';
import { Resolucion } from '../../../interfaces/resolucion';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-resolucion-detalle',
  templateUrl: './resolucion-detalle.component.html',
  styleUrls: ['./resolucion-detalle.component.css']
})
export class ResolucionDetalleComponent implements OnInit {

  currentResolucion: Resolucion | undefined;
  hasResolucion: boolean = false;
  isAdmin!: boolean;

  constructor(private resolucionDataService: ResolucionDataService, private router:Router, private authService : AuthService) {
    this.authService.isAdmin$.subscribe(data => this.isAdmin=data)
   }

  ngOnInit(): void {
    this.resolucionDataService.currentResolucion.subscribe((resolucion:any) => {
      this.currentResolucion = resolucion;
      this.hasResolucion = !!resolucion;
    });
  }

  editarResolucion(resolucion: Resolucion | undefined): void {
this.router.navigateByUrl('/dashboard/resoluciones/modificar')  }

}
