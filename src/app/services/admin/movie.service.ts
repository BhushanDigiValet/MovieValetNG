import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private apollo: Apollo) {}

  // ✅ Get all movies
  getMovies(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: gql`
          query Movies {
            movies {
              id
              title
              description
              imdbRating
              posterUrl
              starCast {
                name
                image
              }
              language
              genre {
                name
                id
              }
              releaseDate
              durationMinutes
            }
          }
        `,
      })
      .valueChanges.pipe(
        tap((response) => console.log('Movies API Response:', response)), 
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // ✅ Get a movie by ID
  getMovieById(movieId: string): Observable<any> {
    return this.apollo
      .watchQuery({
        query: gql`
          query GetMovieById($id: ID!) {
            movie(id: $id) {
              id
              title
              description
              releaseDate
              duration
              genre
              director
            }
          }
        `,
        variables: { id: movieId },
      })
      .valueChanges.pipe(
        tap((response) => console.log('Fetched Movie:', response)),
        catchError((error) => {
          console.error('Error fetching movie by ID:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // ✅ Add a new movie
  addMovie(input: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateMovie($input: CreateMovieInput!) {
          createMovie(input: $input) {
            id
            title
            description
            genre
            imdbRating
            language
            posterUrl
            starCast {
              name
            }
            durationMinutes
            releaseDate
          }
        }
      `,
      variables: {
        ...input,
        genreId: input.genre?.id,
      },
    });
  }

  // ✅ Update an existing movie
  updateMovie(
    movieId: string,
    movieData: Partial<{
      title: string;
      description: string;
      releaseDate: string;
      duration: number;
      genre: string;
      director: string;
    }>
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation UpdateMovie($updateMovieId: ID!, $input: UpdateMovieInput!) {
            updateMovie(id: $updateMovieId, input: $input) {
              id
              title
              description
              releaseDate
              duration
              genre
              director
            }
          }
        `,
        variables: {
          updateMovieId: movieId,
          input: movieData,
        },
      })
      .pipe(
        tap((response) => console.log('Updated Movie:', response)),
        catchError((error) => {
          console.error('Error updating movie:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // ✅ Delete a movie
  deleteMovie(movieId: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation DeleteMovie($deleteMovieId: ID!) {
            deleteMovie(id: $deleteMovieId) {
              id
              title
            }
          }
        `,
        variables: { deleteMovieId: movieId },
      })
      .pipe(
        tap((response) => console.log('Deleted Movie:', response)),
        catchError((error) => {
          console.error('Error deleting movie:', error);
          return throwError(() => new Error(error));
        })
      );
  }
}
