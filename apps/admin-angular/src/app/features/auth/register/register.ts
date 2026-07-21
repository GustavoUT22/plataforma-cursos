import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
    terms: new FormControl(false, [Validators.requiredTrue]),
  });

  errorMessage = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const { name, email, password } = this.registerForm.value;

    this.authService.register(name!, email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrarse';
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
