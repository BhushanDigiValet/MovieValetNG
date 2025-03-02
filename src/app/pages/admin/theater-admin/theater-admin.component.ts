import { Component } from '@angular/core';

import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-theater-admin',
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './theater-admin.component.html',
  styleUrl: './theater-admin.component.scss',
})
export class TheaterAdminComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
