import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { STORED_KEYS } from '../../../../core/constants/stored-keys';
import { interval, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthInputComponent } from '../auth-input/auth-input.component';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, AuthInputComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // variables
  errorMessage = '';
  successMessage = '';
  isShowPassword = false;
  isLoading = false;
  redirectCounter = 5;
  resetPasswordForm!: FormGroup;

  // Form Builder
  initResetPasswordForm(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['ahmedmuttii4012125580@gmail.com'],
      newPassword: ['Ahmed@123'],
    });
  }

  constructor() {
    this.initResetPasswordForm();
  }

  // Form Group
  // resetPasswordForm = new FormGroup({
  //   email: new FormControl(null),
  //   newPassword: new FormControl(null),
  // });

  submitData(): void {
    if (this.isLoading) {
      return;
    }

    this.resetPasswordForm.markAllAsTouched();
    this.errorMessage = '';
    this.successMessage = '';

    if (this.resetPasswordForm.valid) {
      this.isLoading = true;

      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'Updated Password Successfully !';
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
