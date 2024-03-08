import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EfectoresComponent } from './components/efectores/efectores.component';
import { ExpedientesComponent } from './components/expedientes/expedientes.component';
import { ResolucionesComponent } from './components/resoluciones/resoluciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';
import { EfectorFormComponent } from './components/efector-form/efector-form.component';
import { EfectorDetalleComponent } from './components/efector-detalle/efector-detalle.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: 'efectores', component: EfectoresComponent, children:
          [
            { path: 'crear', component: EfectorFormComponent },
            { path: 'modificar', component: EfectorFormComponent },
            { path: 'detalle', component: EfectorDetalleComponent }
          ]
      },
      { path: 'expedientes', component: ExpedientesComponent },
      { path: 'resoluciones', component: ResolucionesComponent },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard] },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

