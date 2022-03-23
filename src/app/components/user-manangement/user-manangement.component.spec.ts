import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManangementComponent } from './user-manangement.component';

describe('UserManangementComponent', () => {
  let component: UserManangementComponent;
  let fixture: ComponentFixture<UserManangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManangementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
