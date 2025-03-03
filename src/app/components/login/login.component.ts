import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { UserService } from '../../services/user/user.service.ts.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.login(email, password).subscribe(
        ({ data }) => {
          if (data && data.login) {
             localStorage.setItem('token', data.login.token);
             localStorage.setItem('role', data.login.role);
            this.router.navigate(['/admin']);
          }
        },
        (error) => {
          if (error.graphQLErrors?.length) {
            this.errorMessage = error.graphQLErrors[0].message;
          } else if (error.networkError) {
            this.errorMessage = 'Network error: Please check your connection.';
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  goToRegister() {
    this.router.navigate(['/']);
  }
}
