import { TestBed } from '@angular/core/testing';

import { InsertListService } from './insert-list.service';

describe('InsertListService', () => {
  let service: InsertListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
