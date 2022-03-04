import { TestBed } from '@angular/core/testing';

import { InsertFolderService } from './insert-folder.service';

describe('InsertFolderService', () => {
  let service: InsertFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
