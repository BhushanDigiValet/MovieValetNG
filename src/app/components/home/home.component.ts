import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, RippleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  goToRegister = () => {
    this.router.navigate(['/register']);
  };
  goToLogin = () => {
    this.router.navigate(['/login']);
  };
}
