import { TestBed } from '@angular/core/testing';

import { ToDoDataService } from './to-do-data.service';

describe('ToDoDataService', () => {
  let service: ToDoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
