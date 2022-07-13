import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from './../../services/notification/notification.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input('request') request: any;
  @Output('update') update = new EventEmitter()

  constructor(private userService: UserService, private notifier: NotificationService) {}

  ngOnInit(): void {}

  deleteRequest(requestId: any) {
    this.userService.delete('request/delete-request/' + requestId).subscribe(
      (response: any) => {
        this.update.next('')
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
        console.log(error);
      },
      (this.request = null)
    );
  }
}
