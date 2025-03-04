import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service.ts.service';
import { AddDialogComponent } from '../../../components/add-dialog/add-dialog.component';
import { DataTableComponent } from '../../../components/data-table/data-table.component';

export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  city: string;
  blocked?: boolean;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AddDialogComponent, DataTableComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: User[] = [];

  userColumns = [
    { field: 'username', header: 'Name' },
    { field: 'role', header: 'Role' },
    { field: 'city', header: 'City' },
    { field: 'email', header: 'Email' },
  ];

  formFields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter username',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Enter email',
    },
    {
      name: 'role',
      label: 'Role',
      type: 'dropdown',
      placeholder: 'Select Role',
      options: [
        { label: 'Customer', value: 'CUSTOMER' },
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Theater Admin', value: 'THEATER_ADMIN' },
      ],
    },
    {
      name: 'password',
      label: 'Password',
      type: 'text',
      placeholder: 'Enter password',
    },
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(({ data }) => {
      if (data?.users) {
        this.users = data.users.map((user: any) => ({
          id: user.id,
          username: user.username,
          role: user.role,
          city: user.cityId ? user.cityId.name : 'Unknown',
          email: user.email,
        }));
      }
    });
  }

  handleFormSubmit(data: User) {
    this.userService.register(data).subscribe({
      next: () => {
        console.log('User registered successfully:', data);
        this.loadUsers(); 
      },
      error: (err) => console.error('Registration failed:', err),
    });
  }

  updateUser(updatedUser: User) {
    console.log(updatedUser.id);
    this.userService.updateUser(updatedUser.id!, updatedUser).subscribe({
      next: () => {
        console.log('User updated:', updatedUser);
        this.loadUsers(); 
      },
      error: (err) => console.error('Error updating user:', err),
    });
  }

  deleteUser(deleteUser: User) {
    console.log('Hello from delet');

    this.userService.deleteUser(deleteUser.id!).subscribe({
      next: () => {
        console.log(deleteUser.id);
        this.users = this.users.filter((user) => user.id !== deleteUser.id);
      },
    });
  }
}
