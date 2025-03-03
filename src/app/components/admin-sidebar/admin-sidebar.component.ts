import { Component, Output, EventEmitter} from '@angular/core';
import { NgClass } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  isOpen: boolean = false;

  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarToggle.emit(this.isOpen);
  }
  constructor(private admin: AdminService, private router: Router) {}

  changeComponent(component: string) {
    this.admin.setSelectedComponent(component);
  }
  logNavigation(page: string) {
    this.router.navigate([page]);
  }
}
