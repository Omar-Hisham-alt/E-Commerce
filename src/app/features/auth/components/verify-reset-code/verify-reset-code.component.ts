import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthInputComponent } from '../auth-input/auth-input.component';

@Component({
  selector: 'app-verify-reset-code',
  imports: [AuthInputComponent, ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.css',
})
export class VerifyResetCodeComponent {
  // Injected
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // variables
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  redirectCounter = 5;

  // Form Control
  resetCode: FormControl = new FormControl('', [Validators.required]);

  submitData(): void {
    if (this.isLoading) {
      return;
    }

    console.log(this.resetCode.value);
    const resetCodeValue = this.resetCode.value;

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.verifyResetCode({ resetCode: resetCodeValue }).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = 'Reset Code Valid !';
        this.isLoading = false;

        // Navigate
        interval(1000)
          .pipe(take(5))
          .subscribe(() => {
            --this.redirectCounter;
            if (this.redirectCounter === 0) {
              this.router.navigateByUrl('/reset-password');
            }
          });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.errorMessage = error.error.message;
        this.isLoading = false;
      },
    });
  }
}
