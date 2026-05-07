import { STORED_KEYS } from './../../../../core/constants/stored-keys';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthInputComponent } from '../auth-input/auth-input.component';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, AuthInputComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // variables
  errorMessage = '';
  successMessage = '';
  isShowPassword = false;
  isLoading = false;
  redirectCounter = 5;
  loginForm!: FormGroup;

  // Form Builder
  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  constructor() {
    this.initLoginForm();
  }

  // Form Group
  // loginForm = new FormGroup({
  //   email: new FormControl(null),
  //   password: new FormControl(null),
  // });

  submitData(): void {
    if (this.isLoading) {
      return;
    }

    this.loginForm.markAllAsTouched();
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Login Successfully !';
          this.isLoading = false;

          // Set Token
          const token = response.token;
          localStorage.setItem(STORED_KEYS.USER_TOKEN, token);

          // Decode Token
          this.authService.decodeToken(token);

          // Navigate
          interval(1000)
            .pipe(take(5))
            .subscribe(() => {
              --this.redirectCounter;
              if (this.redirectCounter === 0) {
                this.router.navigateByUrl('/home');
              }
            });
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
