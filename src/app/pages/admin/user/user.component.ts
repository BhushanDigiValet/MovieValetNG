import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { UserListComponent } from '../../../components/user-list/user-list.component';
import { UserService } from '../../../services/user/user.service.ts.service';

export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
  city: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    UserListComponent,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  visible: boolean = false;
  userForm: FormGroup;
  roles = [
    { label: 'Customer', value: 'CUSTOMER' },
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Theater Admin', value: 'THEATER_ADMIN' },
  ];

  constructor(private fb: FormBuilder, private userService:UserService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  showDialog() {
    this.visible = true;
  }

  addUser() {
    if (this.userForm.valid) {
      const userData: User = this.userForm.value;

      this.userService.register(userData).subscribe({
        next: () => {
          console.log('User registered successfully');
          this.visible = false;
          this.userForm.reset();
        },
        error: () => {
          console.error('Registration failed:');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
