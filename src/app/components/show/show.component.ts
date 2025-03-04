import { Component, OnInit } from '@angular/core';
import { UserMenubarComponent } from '../user-menubar/user-menubar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from '../../services/theater/show.service';
import { ShowStorageService } from '../../services/user/show-storage.service';

interface Theater {
  id: string;
  name: string;
  shows: Show[];
}

interface Show {
  id: string;
  title: string;
  amount: number;
  theaterId: { id: string; name: string };
  showStartTime: string;
  description: string;
  posterUrl: string;
}

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  imports: [UserMenubarComponent, CommonModule, FormsModule],
})
export class ShowComponent implements OnInit {
  movieId: string = '';
  shows: Show[] = [];
  groupedTheaters: Theater[] = [];
  filteredTheaters: Theater[] = [];
  searchText: string = '';

  constructor(
    private route: ActivatedRoute,
    private showService: ShowService,
    private router: Router,
    private showStorageService: ShowStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];

      if (this.movieId) {
        this.fetchShows();
      } else {
        console.error('Movie ID is undefined!');
      }
    });
  }

  fetchShows(): void {
    console.log(`Fetching shows for movie ID: ${this.movieId}`);

    this.showService.getShowsMovieId(this.movieId).subscribe(
      ({ data }) => {
        console.log('Fetched show data:', data);

        if (!data || !data.shows) {
          console.error('No shows found in API response');
          return;
        }

        this.shows = data.shows.map((show: any) => ({
          id: show.id,
          title: show.movieId?.title || 'Unknown Movie',
          description: show.movieId?.description || 'Unknown description',
          posterUrl: show.movieId?.posterUrl || 'Unknown posterUrl',
          amount: show.amount,
          theaterId: show.theaterId
            ? { id: show.theaterId.id, name: show.theaterId.name }
            : { id: 'unknown', name: 'Unknown Theater' },
          showStartTime: show.showStartTime
            ? new Date(parseInt(show.showStartTime)).toISOString()
            : 'N/A',
        }));

        this.groupShowsByTheater();
      },
      (error) => {
        console.error('Error fetching shows:', error);
      }
    );
  }

  private groupShowsByTheater(): void {
    const theaterMap = new Map<string, Theater>();

    this.shows.forEach((show) => {
      if (!theaterMap.has(show.theaterId.id)) {
        theaterMap.set(show.theaterId.id, {
          id: show.theaterId.id,
          name: show.theaterId.name,
          shows: [],
        });
      }
      theaterMap.get(show.theaterId.id)?.shows.push(show);
    });

    this.groupedTheaters = Array.from(theaterMap.values());
    this.filteredTheaters = [...this.groupedTheaters]; // Initialize filtered list
  }

  filterTheaters(): void {
    this.filteredTheaters = this.groupedTheaters.filter((theater) =>
      theater.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  clearFilter(): void {
    this.searchText = '';
    this.filteredTheaters = [...this.groupedTheaters]; // Reset to original data
  }

  reserveShow(show: any): void {
    console.log(show);
    this.showStorageService.setShow(show);
    this.router.navigate(['reservation', show.id]);
  }
}
