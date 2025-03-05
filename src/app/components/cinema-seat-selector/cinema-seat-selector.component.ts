import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { ShowService } from '../../services/theater/show.service';

@Component({
  selector: 'app-cinema-seat-selector',
  imports: [NgFor],
  templateUrl: './cinema-seat-selector.component.html',
  styleUrl: './cinema-seat-selector.component.scss',
})
export class CinemaSeatSelectorComponent implements OnInit {
  @Output() seatSelection = new EventEmitter<string[]>();
  rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  columns = Array.from({ length: 11 }, (_, i) => i + 1);
  selectedSeats = new Set<string>();
  reservedSeats = new Set<string>();
  @Input() showId: string = '';

  constructor(private showService: ShowService) {}

  ngOnInit() {
    console.log('Received showId:', this.showId);
    this.showService.getReservedSeat(this.showId).subscribe(({ data }) => {
      console.log(data);
      if (data.getReservations) {
        data.getReservations.forEach((reservation: { seatNumber: string }) => {
          this.reservedSeats.add(reservation.seatNumber);
        });
      }
    });
  }

  isSelected(seat: string): boolean {
    return this.selectedSeats.has(seat);
  }
  isReserved(seat: string): boolean {
    return this.reservedSeats.has(seat);
  }

  toggleSeat(seat: string): void {
    if (this.isReserved(seat)) return;
    if (this.selectedSeats.has(seat)) {
      this.selectedSeats.delete(seat);
    } else {
      this.selectedSeats.add(seat);
    }
    this.seatSelection.emit(Array.from(this.selectedSeats));
  }
}
