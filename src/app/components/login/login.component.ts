import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { UserService } from '../../services/user/user.service.ts.service';
import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  id: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

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
            
             const decodedToken: TokenPayload = jwtDecode<TokenPayload>(
               data.login.token
             );

             switch (decodedToken.role) {
               case 'ADMIN':
                 this.router.navigate(['/admin']);
                 localStorage.setItem('userRole', 'ADMIN');
                 break;
               case 'CUSTOMER':
                 this.router.navigate(['/home']);
                 localStorage.setItem('userRole', 'CUSTOMER');
                 break;
                case 'THEATER_ADMIN':
                  this.router.navigate(['theater-admin', decodedToken.id]);
                  localStorage.setItem('userRole', 'THEATER_ADMIN');
                  break;
               default:
                 this.router.navigate(['/register']);
             }
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
