import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableToDoComponent } from './editable-to-do.component';

describe('EditableToDoComponent', () => {
  let component: EditableToDoComponent;
  let fixture: ComponentFixture<EditableToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableToDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
