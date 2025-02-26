import { Component } from '@angular/core';
import { UserListComponent } from '../../../components/user-list/user-list.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-theaters',
  imports: [Dialog, ButtonModule, InputTextModule, UserListComponent],
  templateUrl: './theaters.component.html',
  styleUrl: './theaters.component.scss',
})
export class TheatersComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
