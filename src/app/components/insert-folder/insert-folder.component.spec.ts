import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFolderComponent } from './insert-folder.component';

describe('InsertFolderComponent', () => {
  let component: InsertFolderComponent;
  let fixture: ComponentFixture<InsertFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
