import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification/notification.service';
import { MainService } from './../../services/main/main.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { InsertListComponent } from '../insert-list/insert-list.component';

@Component({
  selector: 'app-to-do-folders',
  templateUrl: './to-do-folders.component.html',
  styleUrls: ['./to-do-folders.component.css'],
})
export class ToDoFoldersComponent implements OnInit {
  areListsVisible: boolean = true;
  isToDoVisible: boolean = false;
  toDoFolders: any;
  @Input('toDoFolder') toDoFolder: any;

  listDTO = new FormGroup({
    username: new FormControl(''),
    oldListName: new FormControl(''),
    newListName: new FormControl(''),
    folderName: new FormControl(''),
  });

  folderDTO = new FormGroup({
    username: new FormControl(''),
    oldName: new FormControl(''),
    newName: new FormControl(''),
  });

  constructor(
    private mainService: MainService,
    private notifier: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  toggleListsVisibility() {
    this.areListsVisible = !this.areListsVisible;
  }

  showToDo(listName: any, folderName: any) {
    localStorage.setItem('list', listName);
    localStorage.setItem('folder', folderName);
    location.reload();
  }

  makeFolderEditable(event: any) {
    this.folderDTO.get('oldName')?.setValue(event);
  }
  makeListEditable(oldListName: any, folderName: any) {
    this.listDTO.get('oldListName')?.setValue(oldListName);
    this.listDTO.get('folderName')?.setValue(folderName);
  }

  validateAndChangeListName(event: any) {
    this.listDTO.get('newListName')?.setValue(event.innerText);
    this.listDTO.get('username')?.setValue(localStorage.getItem('username'));
    this.mainService
      .update('/list/change-list-name', this.listDTO.value)
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'Name of the list successfully changed'
          );
          setTimeout(() => location.reload(), 2000);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
          setTimeout(() => location.reload(), 2000);
        }
      );
  }

  validateAndChangeFolderName(event: any) {
    this.folderDTO.get('username')?.setValue(localStorage.getItem('username'));
    this.folderDTO.get('newName')?.setValue(event.innerText);
    if (
      this.folderDTO.get('oldName')?.value ===
      this.folderDTO.get('newName')?.value
    ) {
    } else {
      this.mainService
        .update('/folder/change-folder-name', this.folderDTO.value)
        .subscribe(
          (response: any) => {
            this.notifier.notify(
              NotificationType.SUCCESS,
              'Name of the folder successfully changed'
            );
            setTimeout(() => location.reload(), 2000);
          },
          (error: HttpErrorResponse) => {
            this.notifier.notify(
              NotificationType.ERROR,
              'Something went wrong: most likely name of the folder is doplicate'
            );
            setTimeout(() => location.reload(), 2000);
          }
        );
    }
  }

  openAddListDialog(folderName: any) {
    this.dialog
      .open(InsertListComponent, { data: { folderName: folderName } })
      .afterClosed()
      .subscribe(() => setTimeout(() => location.reload(), 2000));
  }

  deleteList(folderName: any, listName: any) {
    this.mainService
      .delete(
        '/list/delete-list/' +
          listName +
          '/' +
          folderName +
          '/' +
          localStorage.getItem('username')
      )
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'The list successfully deleted'
          );
          setTimeout(() => location.reload(), 2000);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
          setTimeout(() => location.reload(), 2000);
        }
      );
  }

  deleteFolder(folderName: any) {
    this.mainService
      .delete(
        '/folder/delete-folder/' +
          localStorage.getItem('username') +
          '/' +
          folderName
      )
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            folderName + ' successfully deleted'
          );
          setTimeout(() => location.reload(), 2000);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
          setTimeout(() => location.reload(), 2000);
        }
      );
  }
}
