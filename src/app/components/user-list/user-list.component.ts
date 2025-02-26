import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

interface Column {
  field: string;
  header: string;
}

interface Customer {
  [key: string]: string; // Allows dynamic keys for flexible column data
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    Dialog,
    ButtonModule,
    CommonModule,
    TableModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  // Columns (Dynamically Defined)
  columns: Column[] = [
    { field: 'name', header: 'Name' },
    { field: 'city', header: 'City' },
    { field: 'email', header: 'Email' },
  ];

  // Customer Data
  customers: Customer[] = [
    { name: 'John Doe', city: 'New York', email: 'john@example.com' },
    { name: 'Jane Smith', city: 'Los Angeles', email: 'jane@example.com' },
    { name: 'Alice Brown', city: 'Chicago', email: 'alice@example.com' },
  ];

  visible: boolean = false;
  selectedCustomer: Customer = {};
  selectedIndex: number = -1;

  showDialog(customer: Customer, index: number) {
    this.selectedCustomer = { ...customer }; // Copy selected customer data
    this.selectedIndex = index;
    this.visible = true;
  }

  saveChanges() {
    if (this.selectedIndex !== -1) {
      this.customers[this.selectedIndex] = { ...this.selectedCustomer };
    }
    this.visible = false;
  }
}
