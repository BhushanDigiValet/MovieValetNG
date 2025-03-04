import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-cinema-seat-selector',
  imports: [NgFor],
  templateUrl: './cinema-seat-selector.component.html',
  styleUrl: './cinema-seat-selector.component.scss',
})
export class CinemaSeatSelectorComponent {
  @Output() seatSelection = new EventEmitter<string[]>();
  rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  columns = Array.from({ length: 11 }, (_, i) => i + 1);
  selectedSeats = new Set<string>();

  isSelected(seat: string): boolean {
    return this.selectedSeats.has(seat);
  }

  toggleSeat(seat: string): void {
    if (this.selectedSeats.has(seat)) {
      this.selectedSeats.delete(seat);
    } else {
      this.selectedSeats.add(seat);
    }
    this.seatSelection.emit(Array.from(this.selectedSeats));
  }
}
