import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../components/data-table/data-table.component';
import { UserService } from '../../../services/user/user.service.ts.service';
import { SocketService } from '../../../services/socket/socket.service';

export interface Reservation {
  theater: string;
  movie: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-reservation',
  imports: [DataTableComponent],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class AdminReservationComponent {
  reservation: Reservation[] = [];

  columns = [
    { field: 'theater', header: 'Theater' },
    { field: 'movie', header: 'Movie' },
    { field: 'username', header: 'Name' },
    { field: 'email', header: 'Email' },
  ];

  constructor(
    private userService: UserService,
    private socketService: SocketService
  ) {}
  ngOnInit() {
    this.userService.getReservation().subscribe(({ data }) => {
      // console.log(data);

      this.reservation = data.getReservations.map((res: any) => ({
        theater: res.showId.theaterId.name,
        movie: res.showId.movieId.title,
        username: res.userId.username,
        email: res.userId.email,
      }));
    });
    // console.log(this.reservation);

    this.socketService.listenForReservationUpdates((res) => {
      console.log(res);
      const newData: Reservation = {
        theater: res.showId.theaterId.name,
        movie: res.showId.movieId.title,
        username: res.userId.username,
        email: res.userId.email,
      };
      this.reservation = [newData, ...this.reservation];
    });
  }
}
