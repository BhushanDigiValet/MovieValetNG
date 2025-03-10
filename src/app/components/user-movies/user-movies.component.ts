import { Component, OnInit } from '@angular/core';
import { UserMenubarComponent } from '../user-menubar/user-menubar.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MovieCradComponent } from '../movie-crad/movie-crad.component';

@Component({
  selector: 'app-user-movies',
  standalone: true,
  imports: [
    ButtonModule,
    UserMenubarComponent,
    CardModule,
    FormsModule,
    MultiSelectModule,
    CommonModule,
    MovieCradComponent,
  ],
  templateUrl: './user-movies.component.html',
  styleUrl: './user-movies.component.scss',
})
export class UserMoviesComponent implements OnInit {
  genres = [
    { label: 'Action', value: 'action' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Drama', value: 'drama' },
    { label: 'Romantic', value: 'romantic' },
    { label: 'Horror', value: 'horror' },
  ];
  Genrevalue: string[] = [];

  languages = [
    { label: 'English', value: 'english' },
    { label: 'Hindi', value: 'hindi' },
    { label: 'Telugu', value: 'telugu' },
    { label: 'Tamil', value: 'tamil' },
    { label: 'Kannada', value: 'kannada' },
  ];
  Languagevalue: string[] = [];

  imdbRating = Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));
  ImdbRatingvalue: number[] = [];

  appliedFilters: { label: string; value: any }[] = [];

  movies = [
    {
      title: 'Avengers: Endgame',
      imdbRating: 8.4,
      genre: 'action',
      language: 'english',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/q6725aR8Zs4IwGMXzZT8aC8lh41.jpg',
      description: 'The epic conclusion to the Infinity Saga.',
    },
    {
      title: 'KGF Chapter 2',
      imdbRating: 8.6,
      genre: 'action',
      language: 'kannada',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/vUo0pNXGkrHRGtDxVdI7HzRZecp.jpg',
      description: 'Rocky rises to power in the underworld.',
    },
    {
      title: 'Inception',
      imdbRating: 8.8,
      genre: 'drama',
      language: 'english',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
      description: 'A thief who enters the dreams of others.',
    },
    {
      title: '3 Idiots',
      imdbRating: 8.4,
      genre: 'comedy',
      language: 'hindi',
      posterUrl:
        'https://www.google.com/imgres?q=3%20idiots&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt1187043%2F&docid=7TUBuwWW0_s74M&tbnid=1fb7G_t1TB2YhM&vet=12ahUKEwjHjtfmrv6LAxWwb2wGHTOKA6QQM3oECBMQAA..i&w=1000&h=1440&hcb=2&ved=2ahUKEwjHjtfmrv6LAxWwb2wGHTOKA6QQM3oECBMQAA',
      description: 'A story about friendship and education.',
    },
  ];

  filteredMovies = [...this.movies];

  ngOnInit() {
    this.updateAppliedFilters();
  }

  updateAppliedFilters() {
    this.filteredMovies = this.movies.filter((movie) => {
      const genreMatch = this.Genrevalue.length
        ? this.Genrevalue.includes(movie.genre)
        : true;
      const languageMatch = this.Languagevalue.length
        ? this.Languagevalue.includes(movie.language)
        : true;
      const ratingMatch = this.ImdbRatingvalue.length
        ? this.ImdbRatingvalue.includes(Math.floor(movie.imdbRating))
        : true;

      return genreMatch && languageMatch && ratingMatch;
    });
  }

  removeFilter(filter: any) {
    this.Genrevalue = this.Genrevalue.filter((val) => val !== filter.value);
    this.Languagevalue = this.Languagevalue.filter(
      (val) => val !== filter.value
    );
    this.ImdbRatingvalue = this.ImdbRatingvalue.filter(
      (val) => val !== filter.value
    );

    this.updateAppliedFilters();
  }
}
