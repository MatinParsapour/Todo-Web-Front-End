import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification/notification.service';
import { ToDoService } from './../../services/to-do/to-do.service';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-to-do-picture',
  templateUrl: './to-do-picture.component.html',
  styleUrls: ['./to-do-picture.component.css'],
})
export class ToDoPictureComponent implements OnInit {
  @Input('picture') picture: string = '';
  @Input('toDoId') toDoId: any;
  pictureName = '';

  constructor(
    private toDoService: ToDoService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
    this.pictureName = this.picture.split('/').slice(-1)[0];
    this.pictureName = this.pictureName.replace('%20', ' ');
  }

  removePicture() {
    this.toDoService.delete('to-do/delete-photo/' + this.toDoId + "/" + this.pictureName).subscribe(
      (repsonse: any) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'Picture successfully deleted, you may need to refresh page'
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
