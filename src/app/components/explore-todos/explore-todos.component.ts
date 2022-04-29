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
  isEmojiPickerVisible = false;
  comment: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private todoService: ToDoService,
    private userService: UserService,
    private notifier: NotificationService,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {
    this.id = data.id;
    this.comment = fb.group({
      userId: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      todoId: new FormControl('', Validators.required),
    });
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
        console.log(this.todo);
        console.log(
          this.todo.comments.forEach((element: any) => {
            console.log(element.user.firstName);
          })
        );
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

  get message(): any {
    return this.comment.get('message');
  }

  sendComment() {
    this.initializeComment();
    this.commentService.create('/comment', this.comment.value).subscribe(
      (response) => {
        this.getToDo();
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      },
      () => {
        this.comment.get('message')?.setValue('');
      }
    );
  }

  addEmoji(event: any) {
    this.comment
      .get('message')
      ?.setValue(this.comment.get('message')?.value + event.emoji.native);
  }

  initializeComment() {
    this.comment.get('userId')?.setValue(localStorage.getItem('username'));
    this.comment.get('todoId')?.setValue(this.todo.id);
  }
}
