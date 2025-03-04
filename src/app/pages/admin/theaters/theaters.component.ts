import { Component, OnInit } from '@angular/core';


import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AddDialogComponent } from '../../../components/add-dialog/add-dialog.component';
import { TheaterService } from '../../../services/admin/theater.service';
import { DataTableComponent } from '../../../components/data-table/data-table.component';


@Component({
  selector: 'app-theaters',
  imports: [
    ButtonModule,
    InputTextModule,
    
    AddDialogComponent,
    DataTableComponent,
  ],
  templateUrl: './theaters.component.html',
  styleUrl: './theaters.component.scss',
})
export class TheatersComponent {
  formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter theater name',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'Enter Address',
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter city',
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      placeholder: 'Enter State',
    },
    {
      name: 'pinCode',
      label: 'Pin Code',
      type: 'text',
      placeholder: 'Enter Pin Code',
    },
    {
      name: 'email',
      label: 'Admin Email',
      type: 'text',
      placeholder: 'Enter email',
    },
  ];

  theater = [];
  theaterColumns = [
    { field: 'name', header: 'Name' },
    { field: 'username', header: 'Admin name' },
    { field: 'city', header: 'City' },
    { field: 'email', header: 'Admin email' },
  ];
  constructor(private theaterService: TheaterService) {}

  onDialogCancel() {
    console.log('Dialog canceled');
  }

  onDialogSubmit(formData: any) {
    console.log('Form submitted:', formData);
  }
  handleFormSubmit(data: any) {
    console.log(data);

    this.theaterService.CreateTheater(data).subscribe({
      next: (thData) => {
        console.log('theater added:', thData);
      },
      error: (err) => console.error('Error theater added:', err),
    });
  }
  ngOnInit() {
    this.loadTheaters();
  }
  loadTheaters() {
    this.theaterService.getTheater().subscribe(({ data }) => {
      this.theater = data.theaters.map((th: any) => ({
        id: th.id,
        name: th.name,
        username: th.adminId.username,
        city: th.location.city,
        email: th.adminId.email,
      }));
    });
  }
}
