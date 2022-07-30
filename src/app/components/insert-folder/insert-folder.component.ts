import { FolderNameValidator } from './folder-name.validator';
import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InsertFolderService } from './../../services/insert-folder/insert-folder.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-insert-folder',
  templateUrl: './insert-folder.component.html',
  styleUrls: ['./insert-folder.component.css'],
})
export class InsertFolderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private insertFolderService: InsertFolderService,
    private notifier: NotificationService,
    private folderNameValidator: FolderNameValidator
  ) {}

  insertFolder = new UntypedFormGroup({
    folderName: new UntypedFormControl(
      '',
      [Validators.required, Validators.minLength(3)],
      this.folderNameValidator.validate
    ),
    userId: new UntypedFormControl(''),
  });

  ngOnInit(): void {}

  closeDialog() {
    this.dialog.closeAll();
  }

  addFolder() {
    const localStorageUsername = localStorage.getItem('username');
    if (localStorageUsername?.toString() !== undefined) {
      this.insertFolder.get('userId')?.setValue(localStorageUsername);
    }
    this.isLoading = true;
    this.insertFolderService
      .update('folder/insert-folder', this.insertFolder.value)
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          this.notifier.notify(
            NotificationType.SUCCESS,
            this.folderName.value + ' successfully added'
          );
          this.dialog.closeAll();
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
  }

  getFolderNameErrorMessages() {
    if (this.folderName.hasError('required')) {
      return 'Please select a name for your folder';
    }
    if (this.folderName.hasError('folderNameIsDoplicate')) {
      return 'A folder with same name already exists';
    }
    return 3 - this.folderName.value.length + ' more character';
  }

  get folderName(): any {
    return this.insertFolder.get('folderName');
  }
}
