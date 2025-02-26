import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-options',
  imports: [CommonModule, AvatarModule, ButtonModule, RippleModule],
  templateUrl: './admin-options.component.html',
  styleUrl: './admin-options.component.scss',
})
export class AdminOptionsComponent {
  constructor(private router: Router) {}
  goToMovie() {
    this.router.navigate(['admin/movie']);
  }
  @Input() stats = [
    {
      label: 'User',
      value: 152,
      change: '24 new',
      changeDescription: 'user',
      icon: 'pi pi-user',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100',
      btnValue: 'Get',
    },
    {
      label: 'Movie',
      value: 100,
      change: '52',
      changeDescription: 'movie in show',
      icon: 'pi pi-video',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-100',
      btnValue: 'Add',
    },
    {
      label: 'Theater',
      value: 28441,
      change: '520',
      changeDescription: 'newly registered',
      icon: 'pi pi-ticket',
      iconColor: 'text-cyan-500',
      bgColor: 'bg-cyan-100',
      btnValue: 'Add',
    },
    {
      label: 'Theater Admin',
      value: '152 Admin',

      icon: 'pi pi-user-edit',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-100',
      btnValue: 'Add',
    },
  ];
}
