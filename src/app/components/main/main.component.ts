import { SendEmailComponent } from './../send-email/send-email.component';
import { CategoryService } from './../../services/category/category.service';
import { GetResetEmailComponent } from './../get-reset-email/get-reset-email.component';
import { ForgetPasswordComponent } from './../forget-password/forget-password.component';
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
  styleUrls: ['./main.component.css', './main.component.scss'],
  animations: [slideToDown],
})
export class MainComponent implements OnInit {
  toDoFolders: any;
  isMyDayAttr = false;
  toDos: any;
  displayInput = true
  user = '';

  categories = [
    {
      name: 'MyDay',
    },
    {
      name: 'Planned',
    },
    {
      name: 'Tasks',
    },
  ];

  toDo = new FormGroup({
    task: new FormControl(''),
    dateTime: new FormControl(null),
    isMyDay: new FormControl(this.isMyDayAttr),
  });

  constructor(
    private mainService: MainService,
    private categoryService: CategoryService,
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
    this.openUserComponent().subscribe((result) => {
      if (result === 'open-phone-dialog') {
        this.openPhoneNumberComponent().subscribe((result) => {
          if (result === 'send-code') {
            this.openCodeValidatorComponent().subscribe(() => {
              this.openUserDialog();
            });
          } else {
            this.openUserDialog();
          }
        });
      } else if (result === 'reset-email') {
        this.openGetResetEmailComponent();
      }
    });
  }

  search(searchInputValue: any) {
    const result = [];
    for (const toDo of this.toDos) {
      if (
        toDo.task.toLowerCase().indexOf(searchInputValue.toLowerCase()) !== -1
      ) {
        result.push(toDo);
      }
    }
    this.toDos = result;
    if (!searchInputValue) {
      this.getAllToDos();
    }
  }

  openPhoneNumberComponent() {
    return this.dialog.open(PhoneNumberComponent).afterClosed();
  }

  openCodeValidatorComponent() {
    return this.dialog
      .open(CodeValidatorComponent, { disableClose: true })
      .afterClosed();
  }

  openUserComponent() {
    return this.dialog.open(UserComponent, {width: '80em'}).afterClosed();
  }

  openGetResetEmailComponent() {
    return this.dialog.open(GetResetEmailComponent);
  }

  addAndUpdateToDos() {
    if (this.task.value.trim() !== '') {
      if (this.dateTime.value === '') {
        this.dateTime.setValue(null);
      }
      this.mainService
        .create(
          '/to-do/add-to-do/' +
            localStorage.getItem('list') +
            '/folder/' +
            localStorage.getItem('folder') +
            '/for/' +
            localStorage.getItem('username'),
          this.toDo.value
        )
        .subscribe(
          (response: any) => {
            this.notifier.notify(
              NotificationType.SUCCESS,
              'Your to do successfully added'
            );
            this.getAllToDos();
            this.clearToDo();
          },
          (error: HttpErrorResponse) => {
            this.notifier.notify(NotificationType.ERROR, error.error);
          }
        );
        this.inputToggle()
    }
  }

  clearToDo() {
    this.task.setValue('');
    this.dateTime.setValue('');
    this.isMyDayAttr = false;
    this.isMyDay.setValue(this.isMyDayAttr);
  }

  inputToggle(){
    this.displayInput = !this.displayInput
  }

  get task(): any {
    return this.toDo.get('task');
  }
  get dateTime(): any {
    return this.toDo.get('dateTime');
  }
  get isMyDay(): any {
    return this.toDo.get('isMyDay');
  }

  toggleIsMyDay() {
    this.isMyDayAttr = !this.isMyDayAttr;
    this.toDo.get('isMyDay')?.setValue(this.isMyDayAttr);
  }

  getAllToDos() {
    this.mainService
      .getToDos(
        '/user/get-to-dos/' +
          localStorage.getItem('list') +
          '/' +
          localStorage.getItem('folder') +
          '/' +
          localStorage.getItem('username')
      )
      .subscribe(
        (response: any) => {
          response.toDoFolders.forEach((folder: any) => {
            folder.toDoLists.forEach((list: any) => {
              this.toDos = list.toDos;
            });
          });
        },
        (error: HttpErrorResponse) => {
          if (error.status === 500) {
            this.loadCategory("tasks")
          } else {
            console.log(error);
          }
        }
      );
  }

  getAllToDoFolders() {
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

  loadCategory(category: string) {
    this.categoryService
      .getAll(
        'category/get-category-to-dos/' +
          category +
          '/' +
          localStorage.getItem('username')
      )
      .subscribe(
        (response: any) => {
          this.toDos = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  openSendEmailDialog(){
    this.dialog.open(SendEmailComponent, {width: "50em"});
  }
}
