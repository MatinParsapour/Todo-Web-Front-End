import { NotificationService } from 'src/app/services/notification/notification.service';
import { ToDoService } from './../../services/to-do/to-do.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.css'],
})
export class CaptionComponent implements OnInit {
  userLiked = false;
  @Input('todo') todo: any;
  @Output('update') update = new EventEmitter()

  constructor(private todoService: ToDoService,
              private notifier: NotificationService) {}

  ngOnInit(): void {
    this.isLiked()
  }

  isLiked() {
    this.todo.likes.forEach((user: any) => {
      if (user.id === localStorage.getItem('username')) {
        this.userLiked = true;
      }
    });
  }

  toggleLike() {
    if (this.userLiked) {
      this.disLike();
    } else {
      this.like();
    }
    this.userLiked = !this.userLiked;
  }

  like() {
    const formData = this.createFormData();
    this.todoService.like(formData).subscribe(
      (response) => {
        this.update.emit()
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }

  disLike() {
    const formData = this.createFormData();
    this.todoService.disLike(formData).subscribe(
      (response) => {
        this.update.emit()
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }

  createFormData(): FormData {
    const formData = new FormData();
    let userId = localStorage.getItem('username');
    if (userId) {
      formData.append('userId', userId);
    }
    formData.append('todoId', this.todo.id);
    return formData;
  }
}
