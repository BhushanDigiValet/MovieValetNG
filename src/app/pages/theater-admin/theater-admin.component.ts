import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { AddDialogComponent } from "../../components/add-dialog/add-dialog.component";
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-theater-admin',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    MenuBarComponent,
    CommonModule,
    AddDialogComponent,
    AdminSidebarComponent
],
  templateUrl: './theater-admin.component.html',
  styleUrl: './theater-admin.component.scss',
})
export class TheaterAdminComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  isOpen: boolean = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
