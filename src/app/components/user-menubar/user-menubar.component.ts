import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge'; // ✅ Import this!
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanel } from 'primeng/overlaypanel';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-user-menubar',
  standalone: true,
  imports: [
    CommonModule,
    Menubar,
    AvatarModule,
    BadgeModule, // ✅ Ensure BadgeModule is included
    TieredMenuModule,
    RippleModule,
    OverlayPanelModule,
  ],
  templateUrl: './user-menubar.component.html',
  styleUrl: './user-menubar.component.scss',
})
export class UserMenubarComponent {
  items: MenuItem[] | undefined;
  userMenuItems: MenuItem[] | undefined;

  @ViewChild('userMenu') userMenu!: OverlayPanel;

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
    ];

    this.userMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
      },
      {
        label: 'Bookings',
        icon: 'pi pi-server',
        badge: '3', // ✅ Ensure badge is defined correctly
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-power-off',
        command: () => {
          this.auth.logout();
          this.router.navigate(['/login']);
        },
      },
    ];
  }
  navigateTo(path: string) {
    if (path === '/login') {
      this.auth.logout();
    }
    this.router.navigate([path]);
  }

  toggleUserMenu(event: Event) {
    this.userMenu.toggle(event);
  }
}
