import { ToDoDataService } from './../../services/to-do-data/to-do-data.service';
import { ToDo } from './../../classes/todo';
import { Category } from './../../enum/category-type';
import { CategoryService } from './../../services/category/category.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { slideToDown, showHide } from './../../animations';
import { NotificationService } from './../../services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MainService } from './../../services/main/main.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { Status } from 'src/app/enum/status-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', './main.component.scss'],
  animations: [slideToDown, showHide],
})
export class MainComponent implements OnInit, OnDestroy {
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
  isToDosEmpty!: boolean;
  subscription!: Subscription;

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
    this.subscription = todoDataService.changed.subscribe((status: boolean) => {
      this.toDos = todoDataService.getToDos();
      this.isUserToDosEmpty();
      this.checkToDosStatus();
      this.getPinnedToDos();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  getUser() {
    this.mainService
      .getAll('/user/get-user/' + this.route.snapshot.params['username'])
      .subscribe(
        (response) => {
          this.user = response;
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
            this.clearToDo();
            this.toggleInputDisplay();
            this.getPinnedToDos();
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
    this.toDo.caption = '';
    this.isMyDay = false;
  }

  isToDoIdExists() {
    return this.todoId == undefined;
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
  }

  isUserToDosEmpty() {
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

  getPinnedToDos() {
    this.pinnedToDos = [];
    this.toDos.forEach((element: any) => {
      if ((element.pinned = true)) {
        this.pinnedToDos.push(element);
        for (var i = 0; i < this.toDos.length; i++) {
          if (this.toDos[i] == element) {
            this.toDos.splice(i, 1);
          }
        }
      }
    });
  }
}
