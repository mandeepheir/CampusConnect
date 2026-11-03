import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: 'app-employer-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './employer-register.html',
  styleUrl: './employer-register.scss',
})
export class EmployerRegister {
  private formBuilder = inject(FormBuilder);

  employerForm = this.formBuilder.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      companyName: ['', Validators.required],
      website: ['', Validators.pattern(/^https?:\/\/.+\..+/)],
      industry: ['', Validators.required],
      companySize: ['', Validators.required]
    },
    {
      validators: passwordMatchValidator
    }
  );

  onSubmit(): void {
    if (this.employerForm.invalid) {
      this.employerForm.markAllAsTouched();
      return;
    }

    console.log('Employer registration form is valid.');
  }
}