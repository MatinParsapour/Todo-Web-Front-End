import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementUserDetailsComponent } from './user-management-user-details.component';

describe('UserManagementUserDetailsComponent', () => {
  let component: UserManagementUserDetailsComponent;
  let fixture: ComponentFixture<UserManagementUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
