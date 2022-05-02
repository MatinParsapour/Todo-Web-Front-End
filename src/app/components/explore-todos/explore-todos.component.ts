import { ClipboardService } from 'ngx-clipboard';
import { CommentService } from './../../services/comment/comment.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToDoService } from './../../services/to-do/to-do.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-explore-todos',
  templateUrl: './explore-todos.component.html',
  styleUrls: ['./explore-todos.component.css'],
})
export class ExploreTodosComponent implements OnInit {
  id: any;
  user: any;
  todo: any;
  slideShowImages: Array<Object> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private todoService: ToDoService,
    private userService: UserService,
    private notifier: NotificationService,
    private fb: FormBuilder,
    private commentService: CommentService,
    private clipboardService: ClipboardService
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.getUser();
    this.getToDo();
  }

  getUser() {
    this.userService.getUserByToDoId(this.id).subscribe(
      (response) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }

  getToDo() {
    this.todoService.getToDo('to-do/get-to-do/' + this.id).subscribe(
      (response) => {
        this.todo = response;
        this.addToQueue();
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }

  slideShowSize() {
    return {
      height: '100px',
    };
  }

  addToQueue() {
    this.slideShowImages = [];
    this.todo.pictures.forEach((element: any) => {
      this.slideShowImages.push({ image: element, thumbImage: element });
    });
  }

  shareToDo(){
    this.clipboardService.copy(
      "http://localhost:4200/to-do?todoId=" + this.todo.id
    )
    this.notifier.notify(NotificationType.SUCCESS, "Link of todo copied to you clipboard")
  }
}
