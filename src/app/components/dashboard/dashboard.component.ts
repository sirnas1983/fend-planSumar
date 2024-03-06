import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {
username : String = '';
rol : String = '';

public constructor(private authService:  AuthService){ 
  this.authService.userEmail$.subscribe(data =>{
    this.username = data;
    this.rol = this.authService.getUserRoles()[0];
  })
  
}

}
