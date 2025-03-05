import { Component, OnInit } from '@angular/core';
import { UserMenubarComponent } from '../user-menubar/user-menubar.component';
import { UserService } from '../../services/user/user.service.ts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  imports: [UserMenubarComponent, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  reservations: any[] = [];
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getReservation().subscribe({
      next: ({ data }) => {
        console.log('Reservations:', data);
        this.reservations = data.getReservations; 
      },
      error: (err) => {
        console.error('Error fetching reservations:', err);
      },
    });
  }
}
