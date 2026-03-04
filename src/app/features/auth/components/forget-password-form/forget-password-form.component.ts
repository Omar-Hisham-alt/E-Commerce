import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthInputComponent } from '../auth-input/auth-input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-forget-password-form',
  imports: [AuthInputComponent, ReactiveFormsModule],
  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.css',
})
export class ForgetPasswordFormComponent {
  // Injected
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // variables
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  redirectCounter = 3;

  // Form Control
  email: FormControl = new FormControl(null);

  submitData(): void {
    if (this.isLoading) {
      return;
    }

    console.log(this.email.value);

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.forgetPassword(this.email.value).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = response.message;
        this.isLoading = false;

        // Navigate
        interval(1000)
          .pipe(take(5))
          .subscribe(() => {
            --this.redirectCounter;
            if (this.redirectCounter === 0) {
              // this.router.navigateByUrl('/home');
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
