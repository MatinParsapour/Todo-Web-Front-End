import { FollowService } from './../../services/follow/follow.service';
import { CookieService } from 'ngx-cookie';
import { ToDoService } from './../../services/to-do/to-do.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from './../../services/notification/notification.service';
import {
  HttpErrorResponse,
} from '@angular/common/http';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationType } from 'src/app/enum/notification-type';
import { User } from 'src/app/classes/user';
import { ToDo } from 'src/app/classes/todo';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, AfterViewInit {
  user!: User;
  todos: Array<ToDo> = [];
  isLoading: boolean = false;
  todoId = '';
  public profileImage: any;
  fullScreen = false;
  observable: any;
  now = new Date();
  uploaded = 0;
  observer = ''
  resultForRequest = ''

  constructor(
    private userService: UserService,
    private todoService: ToDoService,
    private notifier: NotificationService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private cookieService: CookieService,
    private followService: FollowService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.resultOfRequest()
  }

  ngOnInit(): void {
    this.observable = this.activatedRouter.snapshot.params['observable'];
    var username = this.cookieService.get('username')
    if (username) {
      this.observer = username
    }
    this.todoId = this.activatedRouter.snapshot.params['todoId'];
    this.activatedRouter.params.subscribe((params: Params) => {
      this.todoId = params['todoId'];
    });
    this.getUser();
    this.getToDos();
  }

  closeModal() {
    this.router.navigate([
      'user/' + this.observer + '/' + this.observable,
    ]);
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

  request(){
    const formData = new FormData();
    formData.append('applicantUsername', this.observer);
    formData.append('responderUsername', this.observable);
    this.followService.create('send-follow-request', formData).subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, "Your request sent to user, wait for the response")
        this.resultOfRequest()
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error.type + " " + error.error.message)
      }
    )
  }

  resultOfRequest(){
    this.followService.getAll('get-result-of-request/' + this.observable + "/" + this.observer).subscribe(
      (response: any) => {
        this.resultForRequest = response;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error.type + " " + error.error.message)
      }
    )
  }

  isNotClickable() {
    return (
      this.resultForRequest == 'UNSPECIFIED' ||
      this.resultForRequest == 'REJECTED' ||
      this.resultForRequest == 'ACCEPTED'
    );
  }

  getToDos() {
    this.todoService
      .getAll('to-do/get-user-todos/' + this.observable)
      .subscribe(
        (response: any) => {
          this.todos = response;
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.notifier.notify(NotificationType.ERROR, error.error.message);
        }
      );
  }

  openToDoModal(id: any) {
    this.router.navigate([
      'user/' + this.observer + '/' + this.observable,
      { todoId: id },
    ]);
  }

  clickButton(tagId: any) {
    document.getElementById(tagId)?.click();
  }

  backToMain(){
    this.router.navigateByUrl(this.observer)
  }
}
