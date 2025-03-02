import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/admin/movie.service';
import { MessageService } from 'primeng/api'; // For notifications
import { AddDialogComponent } from '../../../components/add-dialog/add-dialog.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DataTableComponent } from '../../../components/data-table/data-table.component';

@Component({
  selector: 'app-movie',
  imports: [
    ButtonModule,
    InputTextModule,
    AddDialogComponent,
    DataTableComponent,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  providers: [MessageService], // PrimeNG Toast Notifications
})
export class MovieComponent {
  visible: boolean = false;
  movies: [] = [];

  movieColumns = [
    { field: 'title', header: 'Title' },
    { field: 'imdbRating', header: 'Rating' },
    { field: 'durationMinutes', header: 'Duration' },
    { field: 'genreName', header: 'Genre' },
  ];

  constructor(
    private movieService: MovieService,
    private messageService: MessageService
  ) {}

  showDialog() {
    this.visible = true;
  }

  // Form Fields
  formFields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter movie title',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter movie description',
    },
    {
      name: 'genre',
      label: 'Genre',
      type: 'text',
      placeholder: 'Enter movie genre',
    },
    {
      name: 'imdbRating',
      label: 'IMDB Rating',
      type: 'number',
      placeholder: 'Enter IMDB rating',
    },
    {
      name: 'language',
      label: 'Language',
      type: 'multi-select',
      placeholder: 'Select languages',
      options: [
        { label: 'English', value: 'english' },
        { label: 'Hindi', value: 'hindi' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'French', value: 'french' },
      ],
    },
    {
      name: 'posterUrl',
      label: 'Poster URL',
      type: 'text',
      placeholder: 'Enter poster image URL',
    },
    {
      name: 'starCast',
      label: 'Star Cast',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'Actor Name',
          type: 'text',
          placeholder: 'Enter actor name',
        },
        {
          name: 'image',
          label: 'Actor Image URL',
          type: 'text',
          placeholder: 'Enter actor image URL',
        },
      ],
    },
    {
      name: 'durationMinutes',
      label: 'Duration (Minutes)',
      type: 'number',
      placeholder: 'Enter movie duration in minutes',
    },
    {
      name: 'releaseDate',
      label: 'Release Date',
      type: 'date',
      placeholder: 'Select release date',
    },
  ];
  ngOnInit() {
    this.listMovie();
  }

  // ✅ Handle Form Submission
  handleFormSubmit(data: any) {
    console.log('Submitting movie:', data);

    this.movieService.addMovie(data).subscribe({
      next: (response) => {
        console.log('Movie added successfully:', response);

        // 🎉 Show success message
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Movie added successfully!',
        });

        this.visible = false; // Close the form dialog
      },
      error: (error) => {
        console.error('Error adding movie:', error);

        // ❌ Show error message
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add movie. Please try again.',
        });
      },
    });
  }

  listMovie() {
    this.movieService.getMovies().subscribe({
      next: (response) => {
        this.movies = response.data.movies.map((movie: any) => ({
          ...movie,
          genreName: movie.genre?.name || 'N/A', // ✅ Extract genre name
        }));
        console.log('Movies:', this.movies);
      },
      error: (error) => console.error('Error fetching movies:', error),
    });
  }

  deleteMovie(movieData: any) {}
  updateMovie(movieData: any) {}
}
