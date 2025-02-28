import { Component } from '@angular/core';
import { UserListComponent } from '../../../components/user-list/user-list.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AddDialogComponent } from "../../../components/add-dialog/add-dialog.component";

@Component({
  selector: 'app-theaters',
  imports: [
   
    ButtonModule,
    InputTextModule,
    UserListComponent,
    AddDialogComponent,
  ],
  templateUrl: './theaters.component.html',
  styleUrl: './theaters.component.scss',
})
export class TheatersComponent {
  fields = [
    { label: 'Movie Name', value: '', placeholder: 'Enter movie name' },
    { label: 'Ticket Price', value: '', placeholder: 'Enter ticket price' },
    { label: 'Show Time', value: '', placeholder: 'Enter show time' },
  ];

  onDialogCancel() {
    console.log('Dialog canceled');
  }

  onDialogSubmit(formData: any) {
    console.log('Form submitted:', formData);
    // Handle form submission (e.g., send data to an API)
  }
}
