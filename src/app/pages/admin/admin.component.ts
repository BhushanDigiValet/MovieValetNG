import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { EditableTableComponent } from '../../components/editable-table/editable-table.component';
import { MessageService } from 'primeng/api';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { AdminService } from '../../services/admin.service';
import { MovieComponent } from './movie/movie.component';
import { TheaterAdminComponent } from './theater-admin/theater-admin.component';
import { TheatersComponent } from './theaters/theaters.component';
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
    UserComponent,
    MovieComponent,
    TheaterAdminComponent,
    TheatersComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService],
})
export class AdminComponent {
  isSidebarOpen = false;
  selectedComponent: string = 'Users';

  constructor(private adminService: AdminService) {
    this.adminService.selectedComponent$.subscribe((component) => {
      this.selectedComponent = component;
    });
  }
  onSidebarToggle(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}
