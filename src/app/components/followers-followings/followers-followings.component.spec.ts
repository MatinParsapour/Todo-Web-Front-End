import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersFollowingsComponent } from './followers-followings.component';

describe('FollowersFollowingsComponent', () => {
  let component: FollowersFollowingsComponent;
  let fixture: ComponentFixture<FollowersFollowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowersFollowingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersFollowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
