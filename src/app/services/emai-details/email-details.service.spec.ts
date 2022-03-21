import { TestBed } from '@angular/core/testing';

import { EmailDetailsService } from './email-details.service';

describe('EmailDetailsService', () => {
  let service: EmailDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
