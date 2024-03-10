import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Efector } from '../../../interfaces/efector';
import { AuthService } from '../../../services/auth.service';
import { EfectorDataService } from '../../../services/efector-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-efectores',
  templateUrl: './efectores.component.html',
  styleUrls: ['./efectores.component.css']
})
export class EfectoresComponent implements OnInit {

  cantEfectores: number = 0;
  efectoresOriginal: Efector[] = [];
  efectores: Efector[] = [];
  isAdmin: Boolean = false;
  isLoading: boolean = false;

  // paginacion
  currentPage: number = 0;
  pageSize: number = 20;
  totalItems: number = 0;

  private endpoint: string = 'efectores';

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService, private efectorData: EfectorDataService) { }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((data: boolean) => {
      this.isAdmin = data;
    })
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.apiService.fetchData(this.endpoint).subscribe((data: any) => {
      data = data.sort((a: Efector, b: Efector) => a.region.localeCompare(b.region));
      this.efectoresOriginal = data;
      this.efectorData.changeListaEfectores(data);
      this.efectores = data;
      this.isLoading = false;
    });
  }

  isRouteActive(): boolean {
    return this.router.url === '/dashboard/efectores';
  }

  filtrarLista(event: any): void {
    const busqueda = (event.target as HTMLInputElement)?.value || '';
    this.efectores = this.efectoresOriginal.filter(item =>
      item.cuie.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.region.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  verEfector(efector: Efector) {
    this.efectorData.changeEfector(efector);
    this.router.navigateByUrl('/dashboard/efectores/detalle');
  }

  editarEfector(efector: Efector) {
    this.efectorData.changeEfector(efector);
    this.router.navigateByUrl('/dashboard/efectores/modificar');
  }

  agregarRegistro(efector: Efector) {

    console.log('Agregar registro:', efector);
  }

  inhabilitarEfector(efector: Efector) {
    // Aquí puedes implementar la lógica para inhabilitar el efector
    console.log('Inhabilitar efector:', efector);
  }

  agregarExpediente(efector: Efector) {
    this.efectorData.changeEfector(efector);
    console.log('Agregar expediente:', efector);
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
