import { Component, OnInit } from '@angular/core';
import { UsuarioDataService } from '../../../services/usuario-data.service'; // Asegúrate de importar el servicio correcto
import { Usuario } from '../../../interfaces/usuario'; // Asegúrate de importar la interfaz correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-detalle',
  templateUrl: './usuarios-detalle.component.html',
  styleUrls: ['./usuarios-detalle.component.css']
})

export class UsuariosDetalleComponent implements OnInit {
  currentUsuario!: Usuario; // Cambia el tipo de 'currentUsuario' a la interfaz correcta
  showRegistros: boolean;
  showExpedientes: boolean;
  showResoluciones: boolean;

  constructor(private usuarioService: UsuarioDataService, private router: Router) {
    this.showRegistros = false;
    this.showExpedientes = false;
    this.showResoluciones = false;
  }

  ngOnInit(): void {
    this.usuarioService.currentUsuario.subscribe(usuario => {
      if (usuario) {
        this.currentUsuario = usuario;
      }
      console.log(this.currentUsuario);
    });
  }

  editarUsuario(currentUsuario: Usuario) {
    this.router.navigateByUrl('/dashboard/usuarios/modificar');
  }

  toggleRegistros() {
    this.showRegistros = !this.showRegistros;
    this.showExpedientes = false;
    this.showResoluciones = false;
  }

  toggleExpedientes() {
    this.showExpedientes = !this.showExpedientes;
    this.showRegistros = false;
    this.showResoluciones = false;
  }

  toggleResoluciones() {
    this.showResoluciones = !this.showResoluciones;
    this.showRegistros = false;
    this.showExpedientes = false;
  }
}
