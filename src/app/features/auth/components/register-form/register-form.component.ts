import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthInputComponent } from '../auth-input/auth-input.component';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, AuthInputComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  // inject
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // variables
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  redirectCounter = 5;
  registerForm!: FormGroup;

  // Form Control
  // userEmail = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  // Form Builder
  initRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/)]],
        rePassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      },
      { validators: this.passwordMissMatch },
    );
  }

  constructor() {
    this.initRegisterForm();
  }

  // Form Group
  // registerForm = new FormGroup(
  //   {
  //     name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/),
  //     ]),
  //     rePassword: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/),
  //     ]),
  //     phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  //   },
  //   this.passwordMissMatch,
  // );

  passwordMissMatch(registerForm: AbstractControl) {
    const password = registerForm.get('password')?.value;
    const rePassword = registerForm.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      return { passwordMissMatch: true };
    }
  }

  submitData(): void {
    if (this.isLoading) {
      return;
    }

    this.registerForm.markAllAsTouched();
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.valid) {
      this.isLoading = true;

      this.authService.signup(this.registerForm.value).subscribe({
        next: () => {
          this.successMessage = 'Account Created Successfully !';
          this.isLoading = false;

          interval(1000)
            .pipe(take(5))
            .subscribe(() => {
              --this.redirectCounter;
              if (this.redirectCounter === 0) {
                this.router.navigateByUrl('/login');
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
