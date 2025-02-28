import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service.ts.service';

interface Column {
  field: string;
  header: string;
}

interface User {
  id: string;
  name: string;
  role: string;
  city: string;
  email: string;
  [key: string]: string; 
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
    { field: 'role', header: 'Role' },
    { field: 'city', header: 'City' },
    { field: 'email', header: 'Email' },
  ];

  // Users Data (Directly from API)
  users: User[] = [];

  visible: boolean = false;
  selectedUser: User = {} as User;
  selectedIndex: number = -1;
 
  
  constructor(private userService: UserService) {}

  showDialog(user: User, index: number) {
    this.selectedUser = { ...user }; // Copy selected user data
    this.selectedIndex = index;
    this.visible = true;
  }

  saveChanges() {
    if (this.selectedIndex !== -1) {
      this.users[this.selectedIndex] = { ...this.selectedUser };
    }
    this.visible = false;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(({ data }) => {
      if (data && data.users) {
        this.users = data.users.map((user: any) => ({
          id: user.id,
          name: user.username,
          role: user.role,
          city: user.cityId ? user.cityId.name : 'Unknown',
          email: user.email,
        }));
      }
    });
  }
  toggleBlockStatus(user: any): void {
    user.blocked = !user.blocked;
  }
  updateUser(updatedUser: any) {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }
}
