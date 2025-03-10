import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCradComponent } from './movie-crad.component';

describe('MovieCradComponent', () => {
  let component: MovieCradComponent;
  let fixture: ComponentFixture<MovieCradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCradComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
