import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void { this.getUser()}

  getUser() {
    this.userService.getUser(localStorage.getItem('username')).subscribe(
      (response: any) => {
        this.user = response
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        this.notifier.notify(
          NotificationType.ERROR,
          'Something went wrong by getting data, try again later'
        );
      }
    );
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'email'];
}
