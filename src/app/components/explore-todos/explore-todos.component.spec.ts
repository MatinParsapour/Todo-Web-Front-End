import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreTodosComponent } from './explore-todos.component';

describe('ExploreTodosComponent', () => {
  let component: ExploreTodosComponent;
  let fixture: ComponentFixture<ExploreTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreTodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
