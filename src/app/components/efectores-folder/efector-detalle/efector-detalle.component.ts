import { Component, OnInit } from '@angular/core';
import { EfectorDataService } from '../../../services/efector-data.service';
import { Efector } from '../../../interfaces/efector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-efector-detalle',
  templateUrl: './efector-detalle.component.html',
  styleUrls: ['./efector-detalle.component.css']
})
export class EfectorDetalleComponent implements OnInit {
  currentEfector: any;
  showRegistros: boolean = false;
  showExpedientes: boolean = false;
  showResoluciones: boolean = false;

  constructor(private efectorService: EfectorDataService, private router: Router) { }

  ngOnInit(): void {
    // Suscripción al observable currentEfector
    this.efectorService.currentEfector.subscribe(efector => {
      this.currentEfector = efector;
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
