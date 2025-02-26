import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

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
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      root: true,
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      root: true,
    },
    {
      label: 'Support',
      icon: 'pi pi-question-circle',
      root: true,
    },
  ];
}
