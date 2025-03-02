import { Component, OnInit } from '@angular/core';
//import { Product } from '@/domain/product';
//import { ProductService } from '@/service/productservice';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-movie-carousel',
  imports: [Carousel, ButtonModule, Tag, TagModule],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.scss',
})
export class MovieCarouselComponent {
  movies = [
    { title: 'Inception', image: 'assets/images/moviePoster.jpg', rating: 8.8 },
    {
      title: 'Interstellar',
      image: 'assets/images/moviePoster.jpg',
      rating: 8.6,
    },
    {
      title: 'The Dark Knight',
      image: 'assets/images/moviePoster.jpg',
      rating: 9.0,
    },
    { title: 'Avatar', image: 'assets/images/moviePoster.jpg', rating: 7.8 },
  ];

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
    { breakpoint: '768px', numVisible: 2, numScroll: 2 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 },
  ];
}
