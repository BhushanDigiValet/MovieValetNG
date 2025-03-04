import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaSeatSelectorComponent } from './cinema-seat-selector.component';

describe('CinemaSeatSelectorComponent', () => {
  let component: CinemaSeatSelectorComponent;
  let fixture: ComponentFixture<CinemaSeatSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaSeatSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaSeatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
