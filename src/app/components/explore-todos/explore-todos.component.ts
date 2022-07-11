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
import { Component, Inject, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-explore-todos',
  templateUrl: './explore-todos.component.html',
  styleUrls: ['./explore-todos.component.css'],
})
export class ExploreTodosComponent implements OnInit {
  @Input('id') id: any;
  user: any;
  todo: any;
  slideShowImages: Array<Object> = [];
  isSaving = false;
  isAdding = false;

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
        this.notifier.notify(NotificationType.ERROR, error.error.type + ": " +  error.error.message);
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
        this.notifier.notify(NotificationType.ERROR, error.error.type + ": " +  error.error.message);
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

  shareToDo() {
    this.clipboardService.copy(
      'http://localhost:4200/to-do?todoId=' + this.todo.id
    );
    this.notifier.notify(
      NotificationType.SUCCESS,
      'Link of todo copied to you clipboard'
    );
  }

  addToUserToDos() {
    this.isAdding = true
    const data = this.createFormData();
    this.todoService.update('to-do/add-todo-to-user-todos', data).subscribe(
      (response) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'The todo added to your to dos'
        );
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error.type + ": " +  error.error.message);
      },
      () => {
        this.isAdding = false
      }
    );
  }

  createFormData(): FormData {
    const formData = new FormData();
    const userId = localStorage.getItem('username');
    if (userId) {
      formData.append('userId', userId);
    }
    formData.append('todoId', this.todo.id);
    return formData;
  }

  saveToDo() {
    this.isSaving = true;
    const data = this.createFormData();
    this.todoService.update('to-do/save-todo-for-user', data).subscribe(
      (response) => {
        this.notifier.notify(NotificationType.SUCCESS, 'Saved to your saves');
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error.type + ": " +  error.error.message);
      },
      () => {
        this.isSaving = false;
      }
    );
  }
}
