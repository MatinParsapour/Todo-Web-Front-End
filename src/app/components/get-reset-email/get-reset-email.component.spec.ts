import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetResetEmailComponent } from './get-reset-email.component';

describe('GetResetEmailComponent', () => {
  let component: GetResetEmailComponent;
  let fixture: ComponentFixture<GetResetEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetResetEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetResetEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
