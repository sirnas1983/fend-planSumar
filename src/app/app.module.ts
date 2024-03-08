import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuarios-folder/login/login.component';
import { WelcomeScreenComponent } from './components/usuarios-folder/welcome-screen/welcome-screen.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EfectoresComponent } from './components/efectores-folder/efectores/efectores.component';
import { ResolucionesComponent } from './components/resoluciones-folder/resoluciones/resoluciones.component';
import { ExpedientesComponent } from './components/expedientes-folder/expedientes/expedientes.component';
import { UsuariosComponent } from './components/usuarios-folder/usuarios/usuarios.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EfectorFormComponent } from './components/efectores-folder/efector-form/efector-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input'
import { EfectorDetalleComponent } from './components/efectores-folder/efector-detalle/efector-detalle.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { DecimalPipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { RegistrosComponent } from './components/registros-folder/registros/registros.component';
import { ExpedientesTableComponent } from './components/expedientes-folder/expedientes-table/expedientes-table.component';
import { ExpedienteDetalleComponent } from './components/expedientes-folder/expediente-detalle/expediente-detalle.component';
registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    UsuariosComponent,
    WelcomeScreenComponent,

    DashboardComponent,
    ResolucionesComponent,

    EfectoresComponent,
    EfectorFormComponent,
    EfectorDetalleComponent,

    RegistrosComponent,

    ExpedientesComponent,
    ExpedientesTableComponent,
    ExpedienteDetalleComponent,

    CurrencyFormatPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DecimalPipe,

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }