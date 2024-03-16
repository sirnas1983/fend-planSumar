import { Component, OnInit } from '@angular/core';
import { Efector } from '../../../interfaces/efector';
import { AuthService } from '../../../services/auth.service';
import { EfectorDataService } from '../../../services/efector-data.service';
import { Router } from '@angular/router';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-efectores',
  templateUrl: './efectores.component.html',
  styleUrl: './efectores.component.css'
})
export class EfectoresComponent implements OnInit {

  cantEfectores: number = 0;
  efectoresOriginal: Efector[] = [];
  efectores: Efector[] = [];
  isAdmin: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router,
    private authService: AuthService,
    private efectorData: EfectorDataService,
    ) { 
    }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((data: boolean) => {
      this.isAdmin = data;
    });
    this.efectorData.updateEfectores();
    this.efectorData.currentListaEfectores.subscribe((data: any) => {
      this.isLoading = true;
      if (data) {
        this.efectoresOriginal = data;
        this.efectores = this.efectoresOriginal;
        this.isLoading = false;
      }
    });
  }

  isRouteActive(): boolean {
    return this.router.url === '/dashboard/efectores';
  }

  filtrarLista(event: any): void {
    const busqueda = (event.target as HTMLInputElement)?.value.trim().toLowerCase();
    if (busqueda === '') {
      this.efectores = this.efectoresOriginal;
    } else {
      this.efectores = this.efectoresOriginal.filter(item =>
        item.cuie.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.region.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
  }

  verEfector(efector: Efector) {
    this.efectorData.changeEfector(efector);
    this.efectorData.fetchEfectorByCuie(efector.cuie);
    this.router.navigateByUrl('/dashboard/efectores/detalle');
  }

  editarEfector(efector: Efector) {
    this.efectorData.changeEfector(efector);
    this.efectorData.fetchEfectorByCuie(efector.cuie);
    this.router.navigateByUrl('/dashboard/efectores/modificar');
  }

  agregarRegistro(efector: Efector) {
    this.efectorData.changeEfector(efector);
    this.router.navigateByUrl('/dashboard/registros/asentar');
  }

  agregarEfector() {
    const efector: Efector = {
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
    }
    this.efectorData.changeEfector(efector);
    this.router.navigateByUrl('/dashboard/efectores/modificar');
  }
}
