import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import path from 'path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    CommonModule,
    MegaMenuModule,
    RippleModule,
    AvatarModule,
    ButtonModule,
  ],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      root: true,
      path: 'admin/users',
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      root: true,
    },
    {
      label: 'Log out',
      icon: 'pi pi-sign-out',
      root: true,
      path: '/login',
    },
    {
      label: 'Support',
      icon: 'pi pi-question-circle',
      root: true,
    },
  ];
  constructor(private auth: AuthService, private router: Router) {}
  navigate(path: string) {
    if (path === '/login') {
      this.auth.logout();
    } else {
      this.router.navigate([path]);
    }
  }
}
