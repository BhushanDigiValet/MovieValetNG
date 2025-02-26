import { Component, Output, EventEmitter} from '@angular/core';
import { NgClass } from '@angular/common';
import { AdminService } from '../../services/admin.service';

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
  constructor(private admin: AdminService) {}

  changeComponent(component: string) {
    this.admin.setSelectedComponent(component);
  }
}
