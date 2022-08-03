import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEditableToDoComponent } from './not-editable-to-do.component';

describe('NotEditableToDoComponent', () => {
  let component: NotEditableToDoComponent;
  let fixture: ComponentFixture<NotEditableToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotEditableToDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotEditableToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
