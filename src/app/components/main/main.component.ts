import { ToDoDataService } from './../../services/to-do-data/to-do-data.service';
import { ToDo } from './../../classes/todo';
import { Category } from './../../enum/category-type';
import { CategoryService } from './../../services/category/category.service';
import { GetResetEmailComponent } from './../get-reset-email/get-reset-email.component';
import { CodeValidatorComponent } from './../code-validator/code-validator.component';
import { PhoneNumberComponent } from './../phone-number/phone-number.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserComponent } from './../user/user.component';
import { slideToDown, showHide } from './../../animations';
import { InsertListComponent } from './../insert-list/insert-list.component';
import { NotificationService } from './../../services/notification/notification.service';
import { InsertFolderComponent } from './../insert-folder/insert-folder.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MainService } from './../../services/main/main.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { Status } from 'src/app/enum/status-type';
import { GuidedTour, GuidedTourService, Orientation } from 'ngx-guided-tour';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', './main.component.scss'],
  animations: [slideToDown, showHide],
})
export class MainComponent implements OnInit {
  toDoFolders: any;
  toDos: Array<ToDo> = [];
  completedToDos: Array<ToDo> = [];
  pinnedToDos: Array<ToDo> = [];
  isMyDay = false;
  user: any;
  name = '';
  username = '';
  isUser = false;
  isShow = false;
  now = new Date();
  todoId: any;
  isToDosEmpty!: boolean

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

  toDo: ToDo = new ToDo();

  constructor(
    private mainService: MainService,
    private categoryService: CategoryService,
    private todoDataService: ToDoDataService,
    private dialog: MatDialog,
    private notifier: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getUser();
  }

  ngOnInit(): void {}

  getUser() {
    this.mainService
      .getAll('/user/get-user/' + this.route.snapshot.params['username'])
      .subscribe(
        (response) => {
          this.user = response;
          this.name = this.user.firstName + ' ' + this.user.lastName;
          this.checkUserRole();
          this.getAllToDoFolders();
          this.loadCategory('tasks');
          this.todoId = this.route.snapshot.params['todoId'];
          this.route.params.subscribe((params: Params) => {
            this.todoId = params['todoId'];
          });
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        }
      );
  }

  isDone(toDo: any) {
    return toDo.status.toString() === Status[Status.DONE];
  }

  toggleInputDisplay() {
    this.isShow = !this.isShow;
  }

  checkUserRole(): any {
    const role = this.user.role;
    if (role === 'ROLE_USER') {
      this.isUser = true;
    } else {
      this.isUser = false;
    }
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

  addAndUpdateToDos() {
    if (this.toDo.task.trim() !== '') {
      this.mainService
        .create('/to-do/add-to-do/' + this.user.userName, this.toDo)
        .subscribe(
          (response: any) => {
            this.notifier.notify(
              NotificationType.SUCCESS,
              'Your to do successfully added'
            );
            this.loadCategory('tasks');
            this.clearToDo();
            this.toggleInputDisplay();
            this.getPinnedToDos()
          },
          (error: HttpErrorResponse) => {
            this.notifier.notify(
              NotificationType.ERROR,
              error.error.type + ': ' + error.error.message
            );
            this.toggleInputDisplay();
          }
        );
    }
  }

  clearToDo() {
    this.toDo.task = '';
    this.toDo.dateTime = '';
    this.isMyDay = false;
  }

  isToDoIdExists(){
    return this.todoId == undefined
  }

  toggleIsMyDay() {
    this.isMyDay = !this.isMyDay;
    if (this.isMyDay) {
      this.toDo.category = Category.MYDAY;
    } else {
      this.toDo.category = Category.TASKS;
    }
  }

  moveToMain() {
    this.router.navigate([this.route.snapshot.params['username']]);
    this.loadCategory('tasks')
  }

  getAllToDos() {
    this.mainService
      .getToDos(
        '/user/get-to-dos/' +
          localStorage.getItem('list') +
          '/' +
          localStorage.getItem('folder') +
          '/' +
          this.user.userName
      )
      .subscribe(
        (response: any) => {
          response.toDoFolders.forEach((folder: any) => {
            folder.toDoLists.forEach((list: any) => {
              this.toDos = list.toDos;
            });
          });
          this.checkToDosStatus()
          this.getPinnedToDos();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        }
      );
  }

  getAllToDoFolders() {
    this.mainService
      .getAll('/folder/get-todo-folders/' + this.user.userName)
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
          this.user.userName
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
        'category/get-category-to-dos/' + category + '/' + this.user.userName
      )
      .subscribe(
        (response: any) => {
          this.toDos = response;
          this.isUserToDosEmpty()
          this.checkToDosStatus();
          this.getPinnedToDos()
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  isUserToDosEmpty(){
    if (this.toDos.length > 0) {
      this.isToDosEmpty = false;
    } else {
      this.isToDosEmpty = true;
    }
  }
  
  getIsMyDay() {
    return this.isMyDay;
  }

  setPlanned() {
    this.toDo.category = Category.PLANNED;
  }

  checkToDosStatus() {
    this.completedToDos.length = 0;
    this.toDos.forEach((element: ToDo) => {
      if (element.status.toString() === Status[Status.DONE]) {
        this.completedToDos.push(element);
      }
    });
  }

  getStarredToDos() {
    this.mainService
      .getToDos('/to-do/get-starred-todos/' + this.user.userName)
      .subscribe(
        (response: any) => {
          this.toDos = response;
          this.checkToDosStatus();
          this.getPinnedToDos()
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  explore(){
    this.router.navigateByUrl('/explore')
  }

  getPinnedToDos(){
    this.pinnedToDos = []
    this.toDos.forEach((element: any) => {
      if (element.pinned = true) {
        this.pinnedToDos.push(element);
        for (var i = 0; i < this.toDos.length; i++) {
          if (this.toDos[i] == element) {
            this.toDos.splice(i, 1)
          }
        }
      }
    });
  }
}
