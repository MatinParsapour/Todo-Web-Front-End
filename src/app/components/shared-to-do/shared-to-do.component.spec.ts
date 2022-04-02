import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedToDoComponent } from './shared-to-do.component';

describe('SharedToDoComponent', () => {
  let component: SharedToDoComponent;
  let fixture: ComponentFixture<SharedToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedToDoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
