import { Component, OnInit } from '@angular/core';
import { EfectorDataService } from '../../../services/efector-data.service';
import { Efector } from '../../../interfaces/efector';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-efector-detalle',
  templateUrl: './efector-detalle.component.html',
  styleUrls: ['./efector-detalle.component.css']
})
export class EfectorDetalleComponent implements OnInit {
  currentEfector!: any;
  showRegistros: boolean;
  showExpedientes: boolean;
  showResoluciones: boolean;
  isAdmin! : boolean;

  constructor(private efectorService: EfectorDataService, private router: Router, private authService:AuthService) {
    this.showRegistros = false;
    this.showExpedientes = false;
    this.showResoluciones = false;
    this.authService.isAdmin$.subscribe(data=>this.isAdmin=data)
   }

  ngOnInit(): void {
      this.efectorService.currentEfector.subscribe(efector => {
      this.currentEfector = efector;
      console.log(this.currentEfector);
    });
  }

  editarEfector(currentEfector:Efector){
    this.router.navigateByUrl('/dashboard/efectores/modificar')
  }

  toggleRegistros() {
    this.showRegistros = !this.showRegistros;
    this.showExpedientes = false;
    this.showResoluciones = false;
  }

  toggleExpedientes() {
    this.showExpedientes = !this.showExpedientes;
    this.showRegistros = false;
    this.showResoluciones = false;
  }

  toggleResoluciones() {
    this.showResoluciones = !this.showResoluciones;
    this.showRegistros = false;
    this.showExpedientes = false;
  }
}
