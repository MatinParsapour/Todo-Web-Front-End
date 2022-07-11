import { ToDoService } from './../../services/to-do/to-do.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationType } from 'src/app/enum/notification-type';
import { User } from 'src/app/classes/user';
import { ToDo } from 'src/app/classes/todo';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user!: User;
  todos: Array<ToDo> = [];
  isLoading: boolean = false;
  public profileImage: any;
  fullScreen = false;
  observable: any;
  now = new Date();
  uploaded = 0;
  requests: any;
  observer = ''

  constructor(
    private userService: UserService,
    private todoService: ToDoService,
    private notifier: NotificationService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.observable =
      this.activatedRouter.snapshot.params['observable'];
    this.observer = this.activatedRouter.snapshot.params['observer'];
    this.getUser();
    this.getToDos();
  }

  getUser() {
    this.isLoading = true;
    this.userService.getUser(this.observable).subscribe(
      (response: any) => {
        this.user = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;

        this.notifier.notify(
          NotificationType.ERROR,
          'Something went wrong by getting data, try again later'
        );
      }
    );
  }

  getToDos(){
    this.todoService.getAll("to-do/get-user-todos/" + this.observable).subscribe(
      (response: any) => {
        this.todos = response
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.notifier.notify(NotificationType.ERROR, error.error.message)
      }
    )
  }

  clickButton(tagId: any) {
    document.getElementById(tagId)?.click();
  }

  backToMain(){
    this.router.navigateByUrl(this.observer)
  }
}
