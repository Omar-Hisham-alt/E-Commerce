import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  /*

  "name": "Route",
  "email":"ahmedmuttii4012@gmail.com",
  "password":"Ahmed@123",
  "rePassword":"Ahmed@123",
  "phone":"01010700701"

   */

  userEmail = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  submitData(): void {
    console.log(this.userEmail);
  }
}
