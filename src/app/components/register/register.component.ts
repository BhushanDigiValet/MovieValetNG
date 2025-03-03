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

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  role:string;
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

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      acceptTerms: [false, Validators.requiredTrue],
      role:['COUSTUMER']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      
      console.log('Form Data:', this.registerForm.value);
    } else {
      console.log('Form is invalid', this.registerForm.value);
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
 
}
