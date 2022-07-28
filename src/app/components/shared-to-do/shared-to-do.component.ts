import { NotificationService } from './../../services/notification/notification.service';
import { ToDo } from './../../classes/todo';
import { ToDoService } from './../../services/to-do/to-do.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-shared-to-do',
  templateUrl: './shared-to-do.component.html',
  styleUrls: ['./shared-to-do.component.css'],
})
export class SharedToDoComponent implements OnInit {
  toDoId: any;
  toDo: ToDo = new ToDo();
  canExecute = false;
  slideShowImages: Array<Object> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private toDoService: ToDoService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
    this.getToDoId();
    this.getToDo();
  }

  getToDoId() {
    this.activatedRoute.queryParams.subscribe(
      (parameter: any) => (this.toDoId = parameter['todoId'])
    );
  }

  getToDo() {
    this.toDoService.getToDo('to-do/get-to-do/' + this.toDoId).subscribe(
      (response: any) => {
        if (response) {
          this.toDo = response;
          this.addToQueue();
        } else {
          this.toDo.id = null;
        }
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.messager
        );
      }
    );
  }

  addToQueue() {
    this.slideShowImages = [];
    this.toDo.pictures.forEach((element: any) => {
      this.slideShowImages.push({ image: element, thumbImage: element });
    });
    this.canExecute = false;
  }

  slideShowSize() {
    return {
      height: '100px',
    };
  }
}
