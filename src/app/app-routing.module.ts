import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenComponent } from './components/usuarios-folder/welcome-screen/welcome-screen.component';
import { LoginComponent } from './components/usuarios-folder/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EfectoresComponent } from './components/efectores-folder/efectores/efectores.component';
import { ExpedientesComponent } from './components/expedientes-folder/expedientes/expedientes.component';
import { ResolucionesComponent } from './components/resoluciones-folder/resoluciones/resoluciones.component';
import { UsuariosComponent } from './components/usuarios-folder/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';
import { EfectorFormComponent } from './components/efectores-folder/efector-form/efector-form.component';
import { EfectorDetalleComponent } from './components/efectores-folder/efector-detalle/efector-detalle.component';
import { ExpedienteDetalleComponent } from './components/expedientes-folder/expediente-detalle/expediente-detalle.component';
import { ExpedienteFormComponent } from './components/expedientes-folder/expediente-form/expediente-form.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, title: "inicioSesion", data: { title: 'Inicio de sesión' } },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: 'efectores', component: EfectoresComponent, children:
          [
            { path: 'crear', component: EfectorFormComponent, canActivate: [AdminGuard], data: { title: 'Crear Efector' } },
            { path: 'modificar', component: EfectorFormComponent, canActivate: [AdminGuard], data: { title: 'Modificar Efector' } },
            { path: 'detalle', component: EfectorDetalleComponent, data: { title: 'Detalle de Efector' } }
          ]
      },
      {
        path: 'expedientes', component: ExpedientesComponent, children:
          [
            { path: 'crear', component: ExpedienteFormComponent, canActivate: [AdminGuard], data: { title: 'Crear Expediente' } },
            { path: 'detalle', component: ExpedienteDetalleComponent, data: { title: 'Detalle de Expediente' } },
            { path: 'modificar', component: ExpedienteFormComponent, canActivate: [AdminGuard], data: { title: 'Modificar Expediente' } },
          ]
      },
      { path: 'resoluciones', component: ResolucionesComponent, data: { title: 'Resoluciones' } },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: { title: 'Usuarios' } },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full', data: { title: 'Inicio de sesión' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


