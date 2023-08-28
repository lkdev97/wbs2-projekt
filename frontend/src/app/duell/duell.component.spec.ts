import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuellComponent } from './duell.component';

describe('DuellComponent', () => {
  let component: DuellComponent;
  let fixture: ComponentFixture<DuellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
