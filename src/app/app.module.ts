import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AppRoutingModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }