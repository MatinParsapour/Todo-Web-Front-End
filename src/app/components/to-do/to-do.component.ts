import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification/notification.service';
import { ToDoService } from './../../services/to-do/to-do.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  @Input('toDo') toDo: any;
  @Output("getToDos") getToDos = new EventEmitter()
  displayDatePicker: boolean = false;

  getAllToDos(){
    this.getToDos.next('')
  }

  constructor(
    private toDoService: ToDoService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {}

  starToDo() {
    this.toDo.isStarred = !this.toDo.isStarred;
    this.toDoService.update('to-do/update-to-do', this.toDo).subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, 'Success');
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.message);
      }
    );
  }

  updateToDoBody(event: any) {
    if (event.innerText !== '') {
      this.toDo.task = event.innerText;
      this.toDoService.update('to-do/update-to-do', this.toDo).subscribe(
        (response: any) => {
          this.notifier.notify(NotificationType.SUCCESS, 'Success');
          this.getAllToDos()
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
    }
  }

  changeDisplayOfDatePicker() {
    this.displayDatePicker = true;
  }
}
