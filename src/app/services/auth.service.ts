import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { SocketService } from './socket/socket.service';

interface TokenPayload {
  id: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private socket: SocketService) {}

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    const decodedToken: TokenPayload = jwtDecode<TokenPayload>(token);
    localStorage.setItem('userRole', decodedToken.role);

    switch (decodedToken.role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        this.socket.connectSocket(token);
        break;
      case 'CUSTOMER':
        this.router.navigate(['/home']);
        break;
      case 'THEATER_ADMIN':
        this.router.navigate(['theater-admin', decodedToken.id]);
        break;
      default:
        this.router.navigate(['/register']);
    }
  }
}
