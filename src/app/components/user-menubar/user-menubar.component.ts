import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-menubar',
  standalone: true, // ✅ Add this to make the component standalone
  imports: [CommonModule, Menubar, BadgeModule, AvatarModule, RippleModule],
  templateUrl: './user-menubar.component.html',
  styleUrl: './user-menubar.component.scss',
})
export class UserMenubarComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'MovieValet',
        path: '',
      },
      {
        label: 'Home',
        icon: 'pi pi-home',
        path: '/home',
      },
      {
        label: 'User Options',
        icon: 'pi pi-search',
        badge: '3',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            shortcut: '⌘+S',
          },
          {
            label: 'Bookings',
            path: '/booking',
            icon: 'pi pi-server',
            shortcut: '⌘+B',
          },
          {
            separator: true,
          },
          {
            label: 'Logout',
            path: '/login',
            icon: 'pi pi-power-off',
            shortcut: '⌘+U',
          },
        ],
      },
    ];
  }
  navigateTo(path: string) {
    if (path === '/login') {
      this.auth.logout();
    }
    this.router.navigate([path]);
  }
}
