import { Component, OnInit } from '@angular/core';
import { Resolucion } from '../../../interfaces/resolucion';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ResolucionDataService } from '../../../services/resolucion-data.service';

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

  constructor(private router: Router, private authService: AuthService, private resolucionData: ResolucionDataService) { }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((data: boolean) => {
      this.isAdmin = data;
    })
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true; // Activamos el loader al iniciar la carga de datos
    this.resolucionData.updateResoluciones();
    this.resolucionData.currentListaResoluciones.subscribe((data: Resolucion[] | null) => {
      if (data) {
        this.resolucionesOriginal = data;
        this.resoluciones = this.resolucionesOriginal;
      }
      this.isLoading = false; // Desactivamos el loader cuando se hayan cargado los datos
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

}
