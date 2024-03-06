import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EfectorDTO } from '../../interfaces/efector';
import { AuthService } from '../../services/auth.service';
import { EfectorDataService } from '../../services/efector-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-efectores',
  templateUrl: './efectores.component.html',
  styleUrls: ['./efectores.component.css']
})
export class EfectoresComponent implements OnInit {

  cantEfectores: number = 0;
  efectoresOriginal: EfectorDTO[] = [];
  efectores: EfectorDTO[] = [];
  isAdmin: Boolean = false;

  private endpoint: string = 'efectores';

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService, private efectorData: EfectorDataService) { }

  ngOnInit(): void {

    this.apiService.fetchData(this.endpoint).subscribe((data: any) => {
      console.log(data);
      this.efectoresOriginal = data;
      this.cantEfectores = data.length;
      this.efectores = this.efectoresOriginal; 

    })
    this.authService.isAdmin$.subscribe((data: boolean) => {
      this.isAdmin = data;
    })

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

  editarEfector(efector: EfectorDTO) {
    this.efectorData.changeEfector(efector);
    this.router.navigateByUrl('/dashboard/efectores/modificar');
  }

  agregarRegistro(efector: EfectorDTO) {
    // Aquí puedes implementar la lógica para agregar un registro al efector
    console.log('Agregar registro:', efector);
  }

  inhabilitarEfector(efector: EfectorDTO) {
    // Aquí puedes implementar la lógica para inhabilitar el efector
    console.log('Inhabilitar efector:', efector);
  }

  agregarExpediente(efector: EfectorDTO) {
    this.efectorData.changeEfector(efector);
    console.log('Agregar expediente:', efector);
  }

  agregarEfector() {
    const efector: EfectorDTO = {
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
    console.log('agregar Efector');
  }

}
