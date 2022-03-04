import { NotificationService } from './../../services/notification/notification.service';
import { InsertFolderComponent } from './../insert-folder/insert-folder.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MainService } from './../../services/main/main.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  toDoFolders: any;
  isEditable: boolean = false;

  folderDTO = new FormGroup({
    username: new FormControl(''),
    oldName: new FormControl(''),
    newName: new FormControl(''),
  });

  constructor(
    private mainService: MainService,
    private dialog: MatDialog,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllToDos();
  }

  getAllToDos() {
    this.mainService
      .getAll('/folder/get-todo-folders/' + localStorage.getItem('username'))
      .subscribe(
        (response: any) => {
          this.toDoFolders = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  makeItEditable(event: any) {
    this.isEditable = true;
    this.folderDTO.get('oldName')?.setValue(event);
  }

  validateAndChangeFolderName(event: any) {
    this.folderDTO.get('username')?.setValue(localStorage.getItem('username'));
    this.folderDTO.get('newName')?.setValue(event.innerText);

    this.mainService
      .update('/folder/change-folder-name', this.folderDTO.value)
      .subscribe(
        (response: any) => {
          this.notifier.notify(NotificationType.SUCCESS, "Name of the folder successfully changed");
          this.isEditable = false;
          this.getAllToDos();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, "Something went wrong: most likely name of the folder is doplicate");
          this.isEditable = false;
          this.getAllToDos();
        }
      );
  }

  openCreateFolderDialog() {
    this.dialog
      .open(InsertFolderComponent)
      .afterClosed()
      .subscribe(() => {
        this.getAllToDos();
      });
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
          this.getAllToDos();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
  }
}
