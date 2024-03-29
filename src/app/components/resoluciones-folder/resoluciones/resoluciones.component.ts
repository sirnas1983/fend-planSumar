import { Component, OnInit } from '@angular/core';
import { Resolucion } from '../../../interfaces/resolucion';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ResolucionDataService } from '../../../services/resolucion-data.service';
import { API_RESOLUCIONES } from '../../../constants/constants';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-resoluciones',
  templateUrl: './resoluciones.component.html',
  styleUrls: ['./resoluciones.component.css']
})
export class ResolucionesComponent implements OnInit {

  cantResoluciones: number = 0;
  resolucionesOriginal: Resolucion[] = [];
  resoluciones: Resolucion[] = [];
  isAdmin: boolean = false;
  isLoading: boolean = false;

  constructor(private apiService : ApiService, private router: Router, private authService: AuthService, private resolucionData: ResolucionDataService) { }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((data: boolean) => {
      this.isAdmin = data;
    })
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true; 
    this.resolucionData.updateResoluciones();
    this.resolucionData.currentListaResoluciones.subscribe((data: Resolucion[] | null) => {
      if (data) {
        this.resolucionesOriginal = data;
        this.resoluciones = this.resolucionesOriginal;
        this.isLoading = false;
      }
    });
  }

  isRouteActive(): boolean {
    return this.router.url === '/dashboard/resoluciones';
  }

  filtrarLista(event: any): void {
    const busqueda = (event.target as HTMLInputElement)?.value.trim().toLowerCase() || '';
    if (busqueda === '') {
      this.resoluciones = this.resolucionesOriginal;
    } else {
      this.resoluciones = this.resolucionesOriginal.filter(item =>
        (item.numero && item.numero.toLowerCase().includes(busqueda)) ||
        (item.nombre && item.nombre.toLowerCase().includes(busqueda)) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(busqueda)) ||
        (item.expedienteDTO.efectorDTO && item.expedienteDTO.efectorDTO.cuie.toLowerCase().includes(busqueda)) ||
        (item.expedienteDTO.efectorDTO && item.expedienteDTO.efectorDTO.nombre.toLowerCase().includes(busqueda)) ||
        (item.expedienteDTO && item.expedienteDTO.nombre && item.expedienteDTO.nombre.toLowerCase().includes(busqueda))
      );
    }
  }

  verResolucion(resolucion: Resolucion) {
    this.resolucionData.changeResolucion(resolucion);
    this.router.navigateByUrl('/dashboard/resoluciones/detalle');
  }

  editarResolucion(resolucion: Resolucion) {
    this.resolucionData.changeResolucion(resolucion);
    this.router.navigateByUrl('/dashboard/resoluciones/modificar');
  }

  borrarExpediente(resolucion: Resolucion) {
    this.apiService.deleteData(API_RESOLUCIONES, resolucion).subscribe(data => {
      console.log(data);
    })
  }

}
