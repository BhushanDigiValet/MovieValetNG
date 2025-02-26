import { Component } from '@angular/core';
import { UserListComponent } from '../../../components/user-list/user-list.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user',
  imports: [Dialog, ButtonModule, InputTextModule, UserListComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
