import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { AdminOptionsComponent } from '../../components/admin-options/admin-options.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MenuBarComponent,
    AvatarModule,
    ButtonModule,
    RippleModule,
    UserListComponent,
    AdminOptionsComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {}
