import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { MessageService } from 'primeng/api';

import { AdminService } from '../../services/admin.service';

import { UserService } from '../../services/user/user.service.ts.service';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MenuBarComponent,
    AvatarModule,
    ButtonModule,
    RippleModule,
    AdminSidebarComponent,
    RouterModule, // Router module included for routing
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService],
})
export class AdminComponent implements OnInit {
  isSidebarOpen = false;

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private router: Router
  ) {}

  onSidebarToggle(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(({ data }) => {});
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
      }
    });
  }
}
