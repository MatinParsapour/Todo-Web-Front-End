import { ClipboardService } from 'ngx-clipboard';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ToDoService } from './../../services/to-do/to-do.service';
import {  MatDialog } from '@angular/material/dialog';
import { ToDo } from './../../classes/todo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationType } from 'src/app/enum/notification-type';
import { Status } from 'src/app/enum/status-type';
import { AggreementComponent } from '../aggreement/aggreement.component';

@Component({
  selector: 'app-edit-to-do',
  templateUrl: './edit-to-do.component.html',
  styleUrls: ['./edit-to-do.component.css'],
})
export class EditToDoComponent implements OnInit {
  folders: any;
  toDo: ToDo = new ToDo();
  minDate = new Date();
  canExecute = false;
  slideShowImages: Array<Object> = [];
  isLoading = false;
  uploaded = 0;
  @Input('todoId') todoId: any;
  @Output('getToDos') getToDos = new EventEmitter();

  statuses = [
    { value: Status.CREATED, viewValue: 'Created' },
    { value: Status.IN_PROGRESS, viewValue: 'In progress' },
    { value: Status.DONE, viewValue: 'Done' },
  ];

  constructor(
    private toDoService: ToDoService,
    private notifier: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getToDo();
    this.addToQueue();
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
          this.getToDo();
        },
        (error: HttpErrorResponse) => {
          console.log(error);

          this.notifier.notify(NotificationType.ERROR, error.message);
        }
      );
    }
  }

  selectPhoto() {
    document.getElementById('selectInput')?.click();
  }

  addPhoto(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('picture', file);
    formData.append('toDoId', this.toDo.id);
    this.isLoading = true;
    this.toDoService.sendPicture(formData).subscribe(
      (event: HttpEvent<any>) => {
        this.reportUploadProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      },
      () => {
        this.isLoading = false;
        this.uploaded = 0;
      }
    );
  }
  reportUploadProgress(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total) {
          this.uploaded = (100 * event.loaded) / event.total;
        }
        break;
      case HttpEventType.Response:
        if (event.status === 200) {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'The picture uploaded'
          );
        } else {
          this.notifier.notify(
            NotificationType.ERROR,
            'Unable to upload image, try again'
          );
        }
        this.getToDo();
        break;
    }
  }

  getToDo() {
    this.toDoService.getToDo('to-do/get-to-do/' + this.todoId).subscribe(
      (response: any) => {
        this.toDo = response;
        this.addToQueue();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  toggleStar() {
    this.toDo.isStarred = !this.toDo.isStarred;
  }
  toggleMyDay() {
    this.toDo.isMyDay = !this.toDo.isMyDay;
  }
}
