import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-user-menubar',
  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    CommonModule,
  ],
  templateUrl: './user-menubar.component.html',
  styleUrl: './user-menubar.component.scss',
})
export class UserMenubarComponent   {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'MovieValet',
      },
      {
        label: 'Home',
        icon: 'pi pi-home',
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
            icon: 'pi pi-server',
            shortcut: '⌘+B',
          },
          {
            separator: true,
          },
          {
            label: 'Logout',
            icon: 'pi pi-power-off',
            shortcut: '⌘+U',
          },
        ],
      },
    ];
  }
}
