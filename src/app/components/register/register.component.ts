import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service.ts.service';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  role: string;
}

@Component({
  selector: 'app-register',
  standalone: true, //
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, CheckboxModule, InputTextModule, ButtonModule], // ✅ Import ReactiveFormsModule
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      acceptTerms: [false, Validators.requiredTrue],
      role: ['CUSTOMER'],
      city: ['indore'],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next: () => {
          console.log('User registered successfully');
          this.router.navigate(['home']);
        },
        error: (err) => console.error('Registration failed:', err),
      });

      console.log('Form Data:', this.registerForm.value);
    } else {
      console.log('Form is invalid', this.registerForm.value);
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
