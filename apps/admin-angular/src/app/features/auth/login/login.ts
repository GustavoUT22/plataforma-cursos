import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  errorMessage = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al iniciar sesión';
      },
    });
  }
}

function emailValidator(control: FormControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return isValid ? null : { invalidEmail: true };
}
