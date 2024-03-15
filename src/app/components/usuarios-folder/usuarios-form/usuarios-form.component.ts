import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ErrorHandlingService } from '../../../services/error-handling.service';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioDataService } from '../../../services/usuario-data.service';
import { API_USUARIOS } from '../../../constants/constants';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {
  endpoint: string = API_USUARIOS;
  usuario!: Usuario;
  isLoading: boolean = false;
  usuariosForm: FormGroup;

  roles: string[] = ['ADMIN', 'USER'];

  constructor(
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService,
    private usuarioData: UsuarioDataService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.usuariosForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: ['', Validators.required],
      validated: [false],
      unlocked: [false],
    });
  }

  ngOnInit(): void {
    this.usuarioData.currentUsuario.subscribe(data => {
      if (data) {
        this.usuario = data;
        this.usuariosForm.patchValue(data);
        this.usuariosForm.get('roles')?.setValue(this.usuario.roles.includes('ADMIN') ? 'ADMIN' : 'USER');
      }
    });
    this.usuariosForm.get('id')?.disable();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.usuariosForm.valid) {
      this.usuariosForm.get('id')?.enable();
      this.usuario = this.usuariosForm.value;
      console.log(this.usuario);
      if (typeof this.usuario.roles === 'string') {
        this.usuario.roles = [this.usuario.roles];
      }
      this.apiService.putData(this.endpoint, this.usuario)
        .subscribe(
          (data: any) => {
            this.resetForm();
            this.usuarioData.updateUsuarios();
            this.usuarioData.fetchUsuarioById(this.usuario.id);
            this.isLoading = false;
            this.location.back();
          },
          error => {
            this.errorHandlingService.handleHttpError(error);
            this.isLoading = false;
          }
        );
    }
  }

  resetForm() {
    this.usuariosForm.reset();
  }
}

