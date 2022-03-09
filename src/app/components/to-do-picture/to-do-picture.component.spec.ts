import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoPictureComponent } from './to-do-picture.component';

describe('ToDoPictureComponent', () => {
  let component: ToDoPictureComponent;
  let fixture: ComponentFixture<ToDoPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
