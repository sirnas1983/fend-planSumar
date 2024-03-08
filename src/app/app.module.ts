import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EfectoresComponent } from './components/efectores/efectores.component';
import { ResolucionesComponent } from './components/resoluciones/resoluciones.component';
import { ExpedientesComponent } from './components/expedientes/expedientes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EfectorFormComponent } from './components/efector-form/efector-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatInputModule } from '@angular/material/input'
import { EfectorDetalleComponent } from './components/efector-detalle/efector-detalle.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { DecimalPipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { RegistrosComponent } from './components/registros/registros.component';
import { ExpedientesTableComponent } from './components/expedientes-table/expedientes-table.component';
registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeScreenComponent,
    DashboardComponent,
    EfectoresComponent,
    ResolucionesComponent,
    ExpedientesComponent,
    UsuariosComponent,
    EfectorFormComponent,    
    PaginationComponent,
    EfectorDetalleComponent,
    CurrencyFormatPipe,
    RegistrosComponent,
    ExpedientesTableComponent,
    

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