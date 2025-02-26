import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface Customer {
  name: string;
  city: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  customers: Customer[] = [
    {
      name: 'John Doe',
      city: 'USA',
      email: 'TechCorp',
    },
    {
      name: 'John Doe',
      city: 'USA',
      email: 'TechCorp',
    },
    {
      name: 'John Doe',
      city: 'USA',
      email: 'TechCorp',
    },
    {
      name: 'John Doe',
      city: 'USA',
      email: 'TechCorp',
    },
    {
      name: 'John Doe',
      city: 'USA',
      email: 'TechCorp',
    },
  ];
}
