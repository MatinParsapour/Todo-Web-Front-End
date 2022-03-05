import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertListComponent } from './insert-list.component';

describe('InsertListComponent', () => {
  let component: InsertListComponent;
  let fixture: ComponentFixture<InsertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
