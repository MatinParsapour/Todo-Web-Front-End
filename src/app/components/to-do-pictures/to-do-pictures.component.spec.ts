import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoPicturesComponent } from './to-do-pictures.component';

describe('ToDoPicturesComponent', () => {
  let component: ToDoPicturesComponent;
  let fixture: ComponentFixture<ToDoPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoPicturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
