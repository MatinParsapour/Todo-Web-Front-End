import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ToDoService } from './../../services/to-do/to-do.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToDo } from './../../classes/todo';
import { Component, OnInit, Inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-edit-to-do',
  templateUrl: './edit-to-do.component.html',
  styleUrls: ['./edit-to-do.component.css'],
})
export class EditToDoComponent implements OnInit {
  toDo: ToDo = new ToDo();
  minDate = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private toDoService: ToDoService,
    private notifier: NotificationService
  ) {
    this.toDo = data.todo;
  }

  ngOnInit(): void {}

  updateToDo() {
    if (this.toDo.dateTime) {
      let date = new Date(this.toDo.dateTime);
      let pipe: DatePipe = new DatePipe('en-US');
      let dueToDate = pipe.transform(date, 'yyyy-MM-dd');
      this.toDo.dateTime = dueToDate;
    }

    if (this.toDo.task !== '') {
      this.toDoService.update('to-do/update-to-do', this.toDo).subscribe(
        (response: any) => {
          this.notifier.notify(NotificationType.SUCCESS, 'Your to do updated');
        },
        (error: HttpErrorResponse) => {
          console.log(error);

          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
    }
  }

  toggleStar() {this.toDo.isStarred = !this.toDo.isStarred;}
  toggleMyDay() {this.toDo.isMyDay = !this.toDo.isMyDay;}
}
