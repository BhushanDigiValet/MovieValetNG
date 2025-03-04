import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { AddDialogComponent } from '../../components/add-dialog/add-dialog.component';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from '../../services/theater/show.service';

export interface Show {
  id?: string;
  showStartTime: string;
  showEndTime: string;
  amount: number;
  title: string;
  showDate: string;
  theater?: string;
}

@Component({
  selector: 'app-theater-admin',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    MenuBarComponent,
    CommonModule,
    AddDialogComponent,
    DataTableComponent,
  ],
  templateUrl: './theater-admin.component.html',
  styleUrls: ['./theater-admin.component.scss'],
})
export class TheaterAdminComponent implements OnInit {
  visible: boolean = false;
  isSidebarOpen = false;
  adminId: string = '';
  theaterId: string = '';
  theaterName: string= '';
  shows: Show[] = [];

  theaterColumns = [
    { field: 'title', header: 'Movie' },
    { field: 'showDate', header: 'Date' },
    { field: 'showStartTime', header: 'Start time' },
    { field: 'showEndTime', header: 'End time' },
    { field: 'amount', header: 'Amount' },
  ];

  formFields = [
    {
      name: 'title',
      label: 'Movie Title',
      type: 'text',
      placeholder: 'Enter movie title',
    },
    {
      name: 'showDate',
      label: 'Show Date',
      type: 'date',
      placeholder: 'Select show date',
    },
    {
      name: 'showStartTime',
      label: 'Show Start Time',
      type: 'time',
      placeholder: 'Select start time',
    },
    {
      name: 'showEndTime',
      label: 'Show End Time',
      type: 'time',
      placeholder: 'Select end time',
    },
    {
      name: 'amount',
      label: 'Ticket Price',
      type: 'number',
      placeholder: 'Enter ticket price',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private showService: ShowService
  ) {}

  ngOnInit() {
    this.adminId = this.route.snapshot.paramMap.get('id') || '';
    //console.log('Admin ID:', this.adminId);

    this.showService.getTheater(this.adminId).subscribe({
      next: ({ data }) => {
        if (data?.theaters?.length) {
          this.theaterId = data.theaters[0].id;
          this.theaterName= data.theaters[0].name;
          console.log(this.theaterName);
          
          console.log('Theater ID:', this.theaterId);
          this.getShows(this.theaterId);
        } else {
          console.warn('No theaters found for this admin.');
        }
      },
      error: (err) => {
        console.error('Error fetching theater:', err);
      },
    });
  }

  getShows(theaterId: string) {
    this.showService.getShows(theaterId).subscribe({
      next: ({ data }) => {
        console.log('Show Data:', data);

        this.shows = data.shows.map((show: any) => {
          const startTime = new Date(Number(show.showStartTime));
          const endTime = new Date(Number(show.showEndTime));
          console.log(startTime);

          return {
            id: show.id,
            showStartTime: !isNaN(startTime.getTime())
              ? startTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
              : 'Invalid Time',

            showEndTime: !isNaN(endTime.getTime())
              ? endTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
              : 'Invalid Time',

            amount: show.amount,
            title: show.movieId.title,

            showDate: !isNaN(startTime.getTime())
              ? startTime.toISOString().split('T')[0]
              : 'Invalid Date',
          };
        });
      },
      error: (err) => {
        console.error('Error fetching shows:', err);
      },
    });
  }

  showDialog() {
    this.visible = true;
  }

  onSidebarToggle(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  handleFormSubmit(data: any) {
    if (!data.showDate || !data.showStartTime) {
      console.error('Missing required fields: showDate or showStartTime');
      return;
    }

    data.showStartTime = new Date(data.showStartTime);
    data.showStartTime = new Date(
      data.showDate.getFullYear(),
      data.showDate.getMonth(),
      data.showDate.getDate()
    );
    data.showEndTime = new Date(data.showEndTime);
    data.showEndTime = new Date(
      data.showDate.getFullYear(),
      data.showDate.getMonth(),
      data.showDate.getDate()
    );
     data.theater = this.theaterName;
     console.log(data.theaterName);
     this.showService.createShow(data).subscribe({
       next: () => {
         console.log('show added:', data);
         
       },
     });

    console.log(data);
  }

  adjustShowTimes(data: any): { showStartTime: string; showEndTime: string } {
    if (!data.showDate || !data.showStartTime || !data.showEndTime) {
      throw new Error(
        'Invalid input: showDate, showStartTime, or showEndTime is missing.'
      );
    }

    const showDate = new Date(data.showDate);
    const startTime = new Date(data.showStartTime);
    const endTime = new Date(data.showEndTime);

    const updatedStartTime = new Date(
      showDate.getFullYear(),
      showDate.getMonth(),
      showDate.getDate(),
      startTime.getHours(),
      startTime.getMinutes(),
      startTime.getSeconds()
    );

    const updatedEndTime = new Date(
      showDate.getFullYear(),
      showDate.getMonth(),
      showDate.getDate(),
      endTime.getHours(),
      endTime.getMinutes(),
      endTime.getSeconds()
    );

    

    return {
      showStartTime: updatedStartTime.toISOString(),
      showEndTime: updatedEndTime.toISOString(),
    };
  }
}
