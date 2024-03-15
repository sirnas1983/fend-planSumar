import { Component } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UsuarioDataService } from '../../../services/usuario-data.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuariosOriginal: Usuario[] = [];
  usuarios: Usuario[] = [];
  isAdmin: boolean = false;
  isLoading: boolean;

  constructor(private router: Router,
    private authService: AuthService,
    private usuarioData: UsuarioDataService,
    ) { 
      this.isLoading=true;
    }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((data: boolean) => {
      this.isAdmin = data;
    });
    this.usuarioData.updateUsuarios();
    this.usuarioData.currentListaUsuarios.subscribe(data => {
      this.isLoading = true;
      if (data) {
        this.usuariosOriginal = data;
        this.usuarios = this.usuariosOriginal;
        this.isLoading = false;
      }
    });
  }

  isRouteActive(): boolean {
    return this.router.url === '/dashboard/usuarios';
  }

  filtrarLista(event: any): void {
    const busqueda = (event.target as HTMLInputElement)?.value.trim().toLowerCase();
    if (busqueda === '') {
      this.usuarios = this.usuariosOriginal;
    } else {
      this.usuarios = this.usuariosOriginal.filter(item =>
        item.email.toLowerCase().includes(busqueda.toLowerCase()) 
      );
    }
  }

  verUsuario(usuario: Usuario) {
    this.usuarioData.changeUsuario(usuario);
    this.usuarioData.fetchUsuarioById(usuario.id);
    this.router.navigateByUrl('/dashboard/usuarios/detalle');
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioData.changeUsuario(usuario);
    this.usuarioData.fetchUsuarioById(usuario.id);
    this.router.navigateByUrl('/dashboard/usuarios/modificar');
  }

  agregarUsuario() {
    const usuario: Usuario = {
      id: '',
      email: '',
      roles: [],
      username: '',
      validated: true,
      unlocked: true,
      lastLoginDate: ''
    }
    this.usuarioData.changeUsuario(usuario);
    this.router.navigateByUrl('/dashboard/usuarios/crear');
  }
}