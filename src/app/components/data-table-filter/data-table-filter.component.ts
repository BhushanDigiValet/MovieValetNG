import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


interface User {
  id: string;
  username: string;
  role: string;
  email: string;
  cityId?: { name: string } | null;
}

@Component({
  selector: 'app-data-table-filter',
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './data-table-filter.component.html',
  styleUrl: './data-table-filter.component.scss',
})
export class DataTableFilterComponent {
  users: User[] = [
    {
      id: '67ad692ad2da98f5fcf0300e',
      username: 'Bhushan1',
      role: 'CUSTOMER',
      email: '@.com2',
      cityId: null,
    },
    {
      id: '67adc76a51055f475701a678',
      username: 'SuperAdmin',
      role: 'ADMIN',
      email: 'Super',
      cityId: null,
    },
    {
      id: '67adecbc80c90037f9b40abd',
      username: 'customer',
      role: 'CUSTOMER',
      email: 'customer@gmail.com',
      cityId: null,
    },
    {
      id: '67b5c0a7293bb0ad87d2ebdd',
      username: 'Cst1',
      role: 'CUSTOMER',
      email: 'Cst1',
      cityId: { name: 'indore' },
    },
    {
      id: '67c05fb4c9be0dd5402b313b',
      username: 'Bhushan',
      role: 'ADMIN',
      email: 'bhushan.shinde@digivalet.com',
      cityId: { name: 'indore' },
    },
    {
      id: '67c5353a8cfb863261cd0d79',
      username: 'Bhushan',
      role: 'CUSTOMER',
      email: 'bhushan.shinde@gmail.com',
      cityId: { name: 'indore' },
    },
  ];

  roles = [
    { label: 'All', value: '' },
    { label: 'CUSTOMER', value: 'CUSTOMER' },
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'THEATER_ADMIN', value: 'THEATER_ADMIN' },
  ];

  filterUsername = '';
  selectedRole = '';

  get filteredUsers(): User[] {
    return this.users.filter(
      (user) =>
        user.username
          .toLowerCase()
          .includes(this.filterUsername.toLowerCase()) &&
        (this.selectedRole ? user.role === this.selectedRole : true)
    );
  }
}
