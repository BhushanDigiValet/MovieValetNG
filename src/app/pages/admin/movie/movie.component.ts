import { Component } from '@angular/core';
import { UserListComponent } from '../../../components/user-list/user-list.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-movie',
  imports: [Dialog, ButtonModule, InputTextModule, UserListComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
