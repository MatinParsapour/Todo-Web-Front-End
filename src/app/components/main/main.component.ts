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

  folderDTO = new FormGroup({
    username: new FormControl(''),
    folderName: new FormControl(''),
  });

  constructor(
    private mainService: MainService,
    private dialog: MatDialog,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void { this.getAllToDos()}

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

  openCreateFolderDialog() {
    this.dialog.open(InsertFolderComponent).afterClosed().subscribe(() => {
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
          this.getAllToDos()
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
  }
}
