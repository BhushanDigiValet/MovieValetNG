import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes it available throughout the app
})
export class SeatSelectionService {
  private selectedSeats = new BehaviorSubject<Set<string>>(new Set());
  selectedSeats$ = this.selectedSeats.asObservable(); // Observable for real-time updates

  constructor() {}

  // Get the current selected seats
  getSeats(): Set<string> {
    return this.selectedSeats.getValue();
  }

  // Add or remove a seat
  toggleSeat(seat: string): void {
    const updatedSeats = new Set(this.selectedSeats.getValue());

    if (updatedSeats.has(seat)) {
      updatedSeats.delete(seat);
    } else {
      updatedSeats.add(seat);
    }

    this.selectedSeats.next(updatedSeats); // Update observable
  }
}
