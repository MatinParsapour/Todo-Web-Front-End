import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFoldersComponent } from './to-do-folders.component';

describe('ToDoFoldersComponent', () => {
  let component: ToDoFoldersComponent;
  let fixture: ComponentFixture<ToDoFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoFoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
