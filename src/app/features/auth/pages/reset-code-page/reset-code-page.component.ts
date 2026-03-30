import { Component } from '@angular/core';
import { VerifyResetCodeComponent } from '../../components/verify-reset-code/verify-reset-code.component';

@Component({
  selector: 'app-reset-code-page',
  imports: [VerifyResetCodeComponent],
  templateUrl: './reset-code-page.component.html',
  styleUrl: './reset-code-page.component.css',
})
export class ResetCodePageComponent {}
