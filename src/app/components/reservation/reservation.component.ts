import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // ✅ Import ActivatedRoute
import { UserMenubarComponent } from '../user-menubar/user-menubar.component';
import { CinemaSeatSelectorComponent } from '../cinema-seat-selector/cinema-seat-selector.component';
import { ShowStorageService } from '../../services/user/show-storage.service';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TransactionService } from '../../services/user/transaction.service';
import { log } from 'console';

interface MovieData {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  amount: number;
  theaterId: { name: string };
  showStartTime: string;
}

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    UserMenubarComponent,
    CinemaSeatSelectorComponent,
    FormsModule,
    Dialog,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent implements OnInit {
  selectedShow: MovieData | null = null;
  visible: boolean = false;
  selectedSeats: string[] = [];
  totalAmount: number = 0;
  cardNumber: number | null = null;
  cvv: number | null = null;
  pin: number | null = null;
  createTransactionId: string = '';
  transactionId: string = '';
  constructor(
    private route: ActivatedRoute,
    private showStorageService: ShowStorageService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    // ✅ Get Transaction ID from URL
    this.createTransactionId = this.route.snapshot.paramMap.get('id') || '';

    this.selectedShow = this.showStorageService.getShow();
    this.calculateTotalAmount();
  }

  getFormattedDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  showDialog() {
    this.visible = true;
  }

  updateSelectedSeats(seats: string[]) {
    this.selectedSeats = seats;
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    if (this.selectedShow) {
      this.totalAmount = this.selectedSeats.length * this.selectedShow.amount;
    }
  }
  reservation() {
    const data = {
      showId: this.createTransactionId,
      transactionId: this.transactionId,
      seatNumber: this.selectedSeats[0],
    };
    this.transactionService.reservation(data).subscribe((data) => {
      console.log(data);
    });
  }
  pay() {
    if (!this.cardNumber || !this.cvv || !this.pin) {
      console.error('Payment details are incomplete.');
      return;
    }

    const transactionData = {
      createTransactionId: this.createTransactionId,
      cardNumber: this.cardNumber,
      cvv: this.cvv,
      pin: this.pin,
      totalAmount: this.totalAmount,
    };

    console.log('Payment Details:', transactionData);

    this.transactionService.transaction(transactionData).subscribe({
      next: (response) => {
        this.transactionId = response.data.createTransaction.id;
        console.log(
          'Transaction Successful:',
          response.data.createTransaction.id
        );
      },
      error: (err) => {
        console.error('Transaction Failed:', err);
      },
    });
    this.reservation();
    this.visible = false;
  }
}
