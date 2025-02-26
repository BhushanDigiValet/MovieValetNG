import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private selectedComponent = new BehaviorSubject<string>('Users');
  selectedComponent$ = this.selectedComponent.asObservable();

  setSelectedComponent(component: string) {
    this.selectedComponent.next(component);
  }
  constructor() {}
}
