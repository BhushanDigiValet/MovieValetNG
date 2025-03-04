import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service available throughout the app
})
export class ShowStorageService {
  private selectedShow = new BehaviorSubject<any>(null);
  selectedShow$ = this.selectedShow.asObservable(); // Observable to subscribe to updates

  constructor() {}

  // Store show data
  setShow(show: any) {
    this.selectedShow.next(show);
  }

  // Retrieve the last stored show data
  getShow() {
    return this.selectedShow.getValue();
  }
}
