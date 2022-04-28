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
  userLiked = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private todoService: ToDoService,
    private userService: UserService,
    private notifier: NotificationService
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
        this.isLiked()
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

  toggleLike() {
    if (this.userLiked) {
      this.disLike();
    } else {
      this.like();
    }
    this.userLiked = !this.userLiked
  }

  like() {
    const formData = this.createFormData();
    this.todoService.like(formData).subscribe(
      response => {
        this.getToDo()
      },
      (error:HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    )
  }

  disLike() {
    const formData = this.createFormData();
    this.todoService.disLike(formData).subscribe(
      response => {
        this.getToDo()
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error)        
      }
    )
  }

  createFormData(): FormData{
    const formData = new FormData();
    let userId = localStorage.getItem('username');
    if (userId){
      formData.append("userId", userId)
    }
    formData.append("todoId", this.todo.id);
    return formData;
  }

  isLiked(){
    this.todo.likes.forEach((user:any) => {
      if (user.id === localStorage.getItem("username")) {
        this.userLiked = true;
      }
    });
  }
}
