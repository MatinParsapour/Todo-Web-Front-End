import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FollowService } from './../../../services/follow/follow.service';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: User[] = [];
  username = '';

  constructor(
    private userService: UserService,
    private followService: FollowService,
    private notifier: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

}
