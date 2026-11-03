import { Component, inject } from '@angular/core';
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
  selector: 'app-student-register',
  imports: [ReactiveFormsModule],
  templateUrl: './student-register.html',
  styleUrl: './student-register.scss',
})
export class StudentRegister {
  private formBuilder = inject(FormBuilder);

  studentForm = this.formBuilder.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      college: ['', Validators.required],
      degree: ['', Validators.required],
      graduationYear: ['', Validators.required],
      skills: ['']
    },
    {
      validators: passwordMatchValidator
    }
  );

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    console.log('Student registration form is valid.');
  }
}