import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  constructor() {}

  connectSocket(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io('http://localhost:4000', {
        auth: { token }, 
      });

      this.socket.on('connect', () => {
        console.log('Connected to WebSocket');
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        reject(error);
      });
    });
  }
  listenForReservationUpdates(callback: (data: any) => void): void {
    this.socket.on('reservationUpdated', (data) => {
      console.log('New Reservation Update:', data);
      callback(data);
    });
  }
  disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from WebSocket');
    }
  }
}
