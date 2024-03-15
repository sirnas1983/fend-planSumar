import { Component } from '@angular/core';
import { Registro } from '../../../interfaces/registro';
import { EfectorDataService } from '../../../services/efector-data.service';
import { ApiService } from '../../../services/api.service';
import { Efector } from '../../../interfaces/efector';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegistroDataService } from '../../../services/registro-data.service';
import { API_REGISTROS } from '../../../constants/constants';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css'
})
export class RegistrosComponent {

  efector!: Efector;
  registros: Registro[] = [];
  endpoint: string = '';
  cuie = '';
  isLoading: boolean = false;
  isAdmin: boolean = false;

  constructor(private efectorData: EfectorDataService,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private registroDataService: RegistroDataService) {
  }

  ngOnInit(){
    this.authService.isAdmin$.subscribe(data => this.isAdmin = data);
    this.isLoading = true;
    this.efectorData.currentEfector.subscribe(data => {
        if (data) {
        this.cuie = data.cuie;
        this.efector = data;
        this.endpoint = `registros?cuie=${data.cuie}`;
        this.apiService.fetchData(this.endpoint).subscribe((data: any) => {
          this.isLoading = false;
          this.registros = data.data;
          this.registros.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
          
        });
      }
    });
  }

  agregarRegistro() {
    this.router.navigateByUrl('/dashboard/registros/asentar');
  }

  editarRegistro(registro: Registro) {
    this.registroDataService.changeRegistro(registro);
    this.router.navigateByUrl('/dashboard/registros/asentar')
  }

  borrarRegistro(registro : Registro){
    this.apiService.deleteData(API_REGISTROS, registro).subscribe( data =>{
      console.log(data);
    })
  }

}