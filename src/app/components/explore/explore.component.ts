import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToDo } from './../../classes/todo';
import { ToDoService } from './../../services/to-do/to-do.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { Location } from '@angular/common';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit {
  todos: any;

  constructor(
    private toDoService: ToDoService,
    private notifier: NotificationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAllToDos();
  }

  getAllToDos() {
    this.toDoService.getAll('to-do/explore').subscribe(
      (response: any) => {
        this.todos = response;
        console.log(this.todos);
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
        console.log(error);
      }
    );
  }

  backToMain() {
    this.location.back();
  }
}
