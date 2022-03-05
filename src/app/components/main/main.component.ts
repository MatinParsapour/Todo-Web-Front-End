import { Router } from '@angular/router';
import { UserComponent } from './../user/user.component';
import { slideToDown } from './../../animations';
import { InsertListComponent } from './../insert-list/insert-list.component';
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
  animations: [slideToDown]
})
export class MainComponent implements OnInit {
  private GET_TO_DOS_URI = '/user/get-to-dos/' + localStorage.getItem('list') + '/' + localStorage.getItem('folder') + '/' + localStorage.getItem('username');
  private GET_TO_DO_FOLDERS_URI = '/folder/get-todo-folders/' + localStorage.getItem('username');
  private CREATE_TO_DO_URI = '/to-do/add-to-do/' + localStorage.getItem('list') + '/folder/' + localStorage.getItem('folder') + '/for/' + localStorage.getItem('username')
  toDoFolders: any;
  isMyDayAttr = false;
  toDos: any;
  user = '';

  toDo = new FormGroup({
    task: new FormControl(''),
    dateTime: new FormControl(''),
    isMyDay: new FormControl(this.isMyDayAttr)
  });

  constructor(
    private mainService: MainService,
    private dialog: MatDialog,
    private notifier: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user =
      localStorage.getItem('firstName') +
      ' ' +
      localStorage.getItem('lastName');
    this.getAllToDoFolders();
    this.getAllToDos();
  }

  openUserDialog() {
    this.dialog.open(UserComponent);
  }

  addAndUpdateToDos() {
    if (this.task.value.trim() !== '') {
      this.mainService.create(this.CREATE_TO_DO_URI, this.toDo.value).subscribe(
        (response: any) => {
          this.notifier.notify(NotificationType.SUCCESS,'Your to do successfully added');
          this.getAllToDos();
          this.clearToDo()
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
    }
  }

  clearToDo(){
    this.task.setValue('');
    this.dateTime.setValue('');
    this.isMyDayAttr = false;
    this.isMyDay.setValue(this.isMyDayAttr)
  }

  get task(): any {return this.toDo.get('task');}
  get dateTime(): any {return this.toDo.get('dateTime');}
  get isMyDay(): any {return this.toDo.get('isMyDay');}

  toggleIsMyDay(){
    this.isMyDayAttr = !this.isMyDayAttr;
    this.toDo.get('isMyDay')?.setValue(this.isMyDayAttr)
  }

  getAllToDos() {
    this.mainService.getToDos(this.GET_TO_DOS_URI).subscribe(
      (response: any) => {
        response.toDoFolders.forEach((folder: any) => {
          folder.toDoLists.forEach((list: any) => {
            this.toDos = list.toDos;
          });
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getAllToDoFolders() {
    this.mainService.getAll(this.GET_TO_DO_FOLDERS_URI).subscribe(
      (response: any) => {
        this.toDoFolders = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  openAddListDialog(folderName: any) {
    this.dialog
      .open(InsertListComponent, { data: { folderName: folderName } })
      .afterClosed()
      .subscribe(() => this.getAllToDoFolders());
  }

  openCreateFolderDialog() {
    this.dialog
      .open(InsertFolderComponent)
      .afterClosed()
      .subscribe(() => {
        this.getAllToDoFolders();
      });
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
          this.getAllToDoFolders();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
          this.getAllToDoFolders();
        }
      );
  }
}
