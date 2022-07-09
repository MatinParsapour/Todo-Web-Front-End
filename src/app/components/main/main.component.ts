import { ToDo } from './../../classes/todo';
import { Category } from './../../enum/category-type';
import { SendEmailComponent } from './../send-email/send-email.component';
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
  toDos: any;
  completedToDos: Array<ToDo> = [];
  isMyDay = false;
  user: any;
  name = '';
  username = '';
  isUser = false;
  isShow = false;
  now = new Date();
  todoId: any;

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
        .create(
          '/to-do/add-to-do/' + localStorage.getItem('username'),
          this.toDo
        )
        .subscribe(
          (response: any) => {
            this.notifier.notify(
              NotificationType.SUCCESS,
              'Your to do successfully added'
            );
            this.loadCategory('tasks');
            this.clearToDo();
            this.toggleInputDisplay();
          },
          (error: HttpErrorResponse) => {
            this.notifier.notify(NotificationType.ERROR, error.error.type + ": " +  error.error.message);
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
    this.router.navigate(['main'])
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
          localStorage.getItem('username')
      )
      .subscribe(
        (response: any) => {
          response.toDoFolders.forEach((folder: any) => {
            folder.toDoLists.forEach((list: any) => {
              this.toDos = list.toDos;
            });
          });
          this.checkToDosStatus()
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.error.type + ": " +  error.error.message);
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
          this.checkToDosStatus();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  openSendEmailDialog() {
    this.dialog.open(SendEmailComponent, { width: '50em' });
  }

  checkUserRole(): any {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_USER') {
      this.isUser = true;
    } else {
      this.isUser = false;
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
      .getToDos('/to-do/get-starred-todos/' + localStorage.getItem('username'))
      .subscribe(
        (response) => {
          this.toDos = response;
          this.checkToDosStatus();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  explore(){
    this.router.navigateByUrl('/explore')
  }

  public mainTour: GuidedTour = {
    tourId: 'main-tour',
    completeCallback: () => {
      this.userVisitedGuide();
    },
    skipCallback: () => {
      this.userVisitedGuide();
    },
    steps: [
      {
        title: 'Welcome',
        content:
          "Here's a tour of website to better understand how to use website, if you are not willing to take this tour simply skip this tour",
      },
      {
        title: 'Add todo',
        selector: '.open-input',
        content: 'By click on this button, you can enter your todo',
        orientation: Orientation.TopRight,
      },
      {
        title: 'Send email',
        selector: '.email',
        content:
          "By click on this button, you'll see a panel that you can send an email to person you want",
        orientation: Orientation.BottomRight,
      },
      {
        title: 'Contact support',
        selector: '.support',
        content:
          "By click on this button you'll redirect to another page that you can contact support and ask any question you want",
        orientation: Orientation.BottomRight,
      },
      {
        title: 'Search',
        selector: '.search-container',
        content:
          'By click on this button you can search through todos and find which one you want',
        orientation: Orientation.BottomLeft,
      },
      {
        title: 'Completed todos',
        selector: 'details',
        content:
          'Your completed todos will appear below this button and you can see by click on this button',
        orientation: Orientation.BottomLeft,
      },
      {
        title: 'Sidebar',
        selector: '.list',
        content:
          'By click on this button, a side bar will appear that you can see categories and folders and lists',
        orientation: Orientation.BottomLeft,
        closeAction: () => document.getElementById('openSideNav')?.click(),
      },
      {
        title: 'Create folder',
        selector: '.createNewFolder',
        content:
          'By click on this button, you can select a name and add a folder to your folders',
        orientation: Orientation.BottomLeft,
      },
      {
        title: 'Categories',
        selector: '.categories',
        content: 'These are categories that you can select them',
        orientation: Orientation.BottomLeft,
      },
      {
        title: 'Get starred todos',
        selector: '.starToDos',
        content: "By click on this button you'll get all of starred todos",
        orientation: Orientation.Bottom,
        action: () => document.getElementById('moreButton')?.click(),
      },
      {
        title: 'Restart tour',
        selector: '.guide',
        content: 'By click on this button you can start this tour again',
        orientation: Orientation.Bottom,
        closeAction: () => document.getElementById('moreButton')?.click(),
      },
      {
        title: 'Folders',
        selector: '.folders',
        content: 'Your folder will appear here',
        orientation: Orientation.TopLeft,
      },
      {
        title: 'Personal information',
        selector: '.user',
        content: "By click here you'll see your information",
        orientation: Orientation.TopLeft,
      },
    ],
  };
}
