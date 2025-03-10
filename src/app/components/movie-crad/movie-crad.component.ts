import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movie-crad',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './movie-crad.component.html',
  styleUrl: './movie-crad.component.scss',
})
export class MovieCradComponent {
  @Input() movie!: {
    title: string;
    imdbRating: number;
    posterUrl: string;
    description: string;
  };
}
