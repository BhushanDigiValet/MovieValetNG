import { Component, OnInit } from '@angular/core';
import { UserMenubarComponent } from "../user-menubar/user-menubar.component";
import { CommonModule } from '@angular/common';
interface Theater {
  id: string;
  name: string;
  shows: Show[];
}

interface Show {
  id: string;
  amount: number;
  theaterId: { id: string; name: string };
  showStartTime: string;
}

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  imports: [UserMenubarComponent, CommonModule],
})
export class ShowComponent implements OnInit {
  shows: Show[] = [
    {
      id: '1',
      amount: 500,
      theaterId: { id: 't1', name: 'Grand Cinema' },
      showStartTime: '2025-03-02T18:00:00',
    },
    {
      id: '2',
      amount: 450,
      theaterId: { id: 't1', name: 'Grand Cinema' },
      showStartTime: '2025-03-02T20:00:00',
    },
    {
      id: '3',
      amount: 600,
      theaterId: { id: 't2', name: 'Royal Theater' },
      showStartTime: '2025-03-02T19:00:00',
    },
    {
      id: '4',
      amount: 550,
      theaterId: { id: 't2', name: 'Royal Theater' },
      showStartTime: '2025-03-02T21:00:00',
    },
  ];
  groupedTheaters: Theater[] = [];

  ngOnInit(): void {
    this.groupShowsByTheater();
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
  }

  reserveShow(show: Show): void {
    console.log(
      `Reserved Show ID: ${show.id}, Theater ID: ${show.theaterId.id}`
    );
  }
}
