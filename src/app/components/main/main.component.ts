import { CodeValidatorComponent } from './../code-validator/code-validator.component';
import { PhoneNumberComponent } from './../phone-number/phone-number.component';
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
    this.dialog.open(UserComponent).afterClosed().subscribe(result => {if (result === 'open-phone-dialog') {
      this.dialog.open(PhoneNumberComponent).afterClosed().subscribe(() =>  
      this.dialog.open(CodeValidatorComponent, { disableClose: true }).afterClosed().subscribe(() => {
        this.dialog.open(UserComponent)
      }));
    }});
  }

  addAndUpdateToDos() {
    if (this.task.value.trim() !== '') {
      this.mainService.create('/to-do/add-to-do/' + localStorage.getItem('list') + '/folder/' + localStorage.getItem('folder') + '/for/' + localStorage.getItem('username'), this.toDo.value).subscribe(
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
    this.mainService.getToDos('/user/get-to-dos/' + localStorage.getItem('list') + '/' + localStorage.getItem('folder') + '/' + localStorage.getItem('username')).subscribe(
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
    this.mainService.getAll('/folder/get-todo-folders/' + localStorage.getItem('username')).subscribe(
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
