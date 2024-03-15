import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ResolucionFormComponent } from './components/resoluciones-folder/resolucion-form/resolucion-form.component';
import { ResolucionDetalleComponent } from './components/resoluciones-folder/resolucion-detalle/resolucion-detalle.component';
import { RegistrosFormComponent } from './components/registros-folder/registros-form/registros-form.component';
import { UsuariosFormComponent } from './components/usuarios-folder/usuarios-form/usuarios-form.component';
import { UsuariosDetalleComponent } from './components/usuarios-folder/usuarios-detalle/usuarios-detalle.component';
import { AuthenticationUserFormComponent } from './components/usuarios-folder/authentication-user-form/authentication-user-form.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Inicio de sesión' },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: 'efectores', component: EfectoresComponent, children:
          [
            { path: 'crear', component: EfectorFormComponent, canActivate: [AdminGuard], title: 'Crear Efector' },
            { path: 'modificar', component: EfectorFormComponent, canActivate: [AdminGuard], title: 'Editar Efector' },
            { path: 'detalle', component: EfectorDetalleComponent, title: 'Detalle de Efector' }
          ]
      },
      {
        path: 'registros/asentar', component: RegistrosFormComponent, canActivate: [AdminGuard], title: 'Asentar Registro'
      }
      ,
      {
        path: 'expedientes', component: ExpedientesComponent, children:
          [
            { path: 'crear', component: ExpedienteFormComponent, canActivate: [AdminGuard], title: 'Crear Expediente' },
            { path: 'detalle', component: ExpedienteDetalleComponent, title: 'Detalle de Expediente' },
            { path: 'modificar', component: ExpedienteFormComponent, canActivate: [AdminGuard], title: 'Editar Expediente' },
          ]
      },
      {
        path: 'resoluciones', component: ResolucionesComponent, data: { title: 'Resoluciones' }, children:
          [
            { path: 'crear', component: ResolucionFormComponent, canActivate: [AdminGuard], title: 'Crear Resolucion' },
            { path: 'detalle', component: ResolucionDetalleComponent, title: 'Detalle de Resolucion' },
            { path: 'modificar', component: ResolucionFormComponent, canActivate: [AdminGuard], title: 'Editar Resolucion' },
          ]
      },
      {
        path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], title: 'Usuarios', children:
          [
            { path: 'crear', component: AuthenticationUserFormComponent, title: 'Crear Usuario' },
            { path: 'modificar', component: UsuariosFormComponent, title: 'Editar Usuario' },
            { path: 'detalle', component: UsuariosDetalleComponent, title: 'Detalle de Usuario' },

          ]
      },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full', data: { title: 'Inicio de sesión' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


