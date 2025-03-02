import { Component } from '@angular/core';
import { UserMenubarComponent } from "../../../components/user-menubar/user-menubar.component";
import { MovieCarouselComponent } from "../../../components/movie-carousel/movie-carousel.component";

@Component({
  selector: 'app-user-home',
  imports: [UserMenubarComponent, MovieCarouselComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {

}
