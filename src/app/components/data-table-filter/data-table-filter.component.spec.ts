import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableFilterComponent } from './data-table-filter.component';

describe('DataTableFilterComponent', () => {
  let component: DataTableFilterComponent;
  let fixture: ComponentFixture<DataTableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
