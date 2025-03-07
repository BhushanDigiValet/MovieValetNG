import { Component } from '@angular/core';
import { UserMenubarComponent } from '../../../components/user-menubar/user-menubar.component';
import { MovieCarouselComponent } from '../../../components/movie-carousel/movie-carousel.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-home',
  imports: [
    UserMenubarComponent,
    MovieCarouselComponent,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent {
  genres = [
    {
      name: 'Action',
      icon: 'pi-bolt',
      description: 'Explosive and thrilling movies with high-energy sequences.',
    },
    {
      name: 'Comedy',
      icon: 'pi-face-smile',
      description: 'Light-hearted and humorous films that entertain and amuse.',
    },
    {
      name: 'Horror',
      icon: 'pi-exclamation-triangle',
      description: 'Spine-chilling movies that keep you on edge.',
    },
    {
      name: 'Sci-Fi',
      icon: 'pi-globe',
      description: 'Futuristic and imaginative films beyond reality.',
    },
    {
      name: 'Drama',
      icon: 'pi-video',
      description: 'Emotional and compelling stories with deep characters.',
    },
    {
      name: 'Animation',
      icon: 'pi-star',
      description: 'Visually stunning movies for all ages.',
    },
  ];
}
