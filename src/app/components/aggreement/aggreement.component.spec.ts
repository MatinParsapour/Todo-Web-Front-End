import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggreementComponent } from './aggreement.component';

describe('AggreementComponent', () => {
  let component: AggreementComponent;
  let fixture: ComponentFixture<AggreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
