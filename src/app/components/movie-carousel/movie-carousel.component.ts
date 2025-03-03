import { Component, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { MovieService } from '../../services/admin/movie.service';

export interface CarouselMovie {
  title: string;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [Carousel, Tag, ButtonModule],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.scss',
})
export class MovieCarouselComponent implements OnInit {
  movies: CarouselMovie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(({ data }) => {
      this.movies = data.movies.map((movie: any) => ({
        title: movie.title,
        image: movie.posterUrl,
        rating: movie.imdbRating,
      }));
    });
  }

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
    { breakpoint: '768px', numVisible: 2, numScroll: 2 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 },
  ];
}
