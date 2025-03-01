import { gql } from 'apollo-angular';

// ✅ Get all movies
export const GET_MOVIES_QUERY = gql`
  query GetMovies {
    movies {
      id
      title
      description
      releaseDate
      duration
      genre
      director
    }
  }
`;

// ✅ Get a single movie by ID
export const GET_MOVIE_BY_ID_QUERY = gql`
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
`;

// ✅ Add a new movie
export const ADD_MOVIE_MUTATION = gql`
  mutation AddMovie($input: AddMovieInput!) {
    addMovie(input: $input) {
      id
      title
      description
      releaseDate
      duration
      genre
      director
    }
  }
`;

// ✅ Update an existing movie
export const UPDATE_MOVIE_MUTATION = gql`
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
`;

// ✅ Delete a movie
export const DELETE_MOVIE_MUTATION = gql`
  mutation DeleteMovie($deleteMovieId: ID!) {
    deleteMovie(id: $deleteMovieId) {
      id
      title
    }
  }
`;
