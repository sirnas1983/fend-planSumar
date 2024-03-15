import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { API_USUARIOS } from '../../../constants/constants';
import { ErrorHandlingService } from '../../../services/error-handling.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-authentication-user-form',
  templateUrl: './authentication-user-form.component.html',
  styleUrls: ['./authentication-user-form.component.css']
})
export class AuthenticationUserFormComponent implements OnInit {
  authenticationUserForm: FormGroup;
  endpoint: string = API_USUARIOS;
  isLoading: boolean = false;

  constructor(private location:Location, private fb: FormBuilder, private apiService: ApiService, private errorHandlingService: ErrorHandlingService) {
    this.authenticationUserForm = this.fb.group({
      email: ['', [Validators.required, this.validateEmailDomain]],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePasswordFormat]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.validatePasswordsMatch
    });
  }

  ngOnInit(): void {
  }

  validatePasswordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsNotMatch: true };
  }

  validatePasswordFormat(control: any) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const valid = passwordRegex.test(control.value);
    return valid ? null : { invalidPasswordFormat: true };
  }

  validateEmailDomain(control: any) {
  const email = control.value;
  const emailRegex = /^[^\s@]{5,}@[^\s@]{4,}\.[^\s@]{3}\.?[^\s@]{0,3}$/;
  return emailRegex.test(email) ? null : { invalidEmailFormat: true };
}

  onSubmit() {
    if (this.authenticationUserForm.valid) {
      this.isLoading = true;
      const usuario = {
        'email' : this.authenticationUserForm.get('email')?.value,
        'password' : this.authenticationUserForm.get('password')?.value
      }
      this.apiService.postData(this.endpoint, usuario).subscribe(
        (data: any) => {
          console.log('Usuario creado exitosamente');
          this.location.back();
          this.isLoading = false;
          this.resetForm();
        },
        (error: any) => {
          console.error('Error al crear usuario:', error);
          this.errorHandlingService.handleHttpError(error);
          this.isLoading = false;
        }
      );
    } else {
      console.log('Formulario inválido. Revise los campos.');
    }
  }

  resetForm() {
    this.authenticationUserForm.reset();
  }
}
