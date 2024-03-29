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
  styleUrls: ['./followers.component.css'],
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
    this.username = this.followService.getUsername();
    this.getFollowers();
  }

  getFollowers() {
    this.userService.getAll('/user/get-followers/' + this.username).subscribe(
      (response: any) => {
        this.followers = response;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
      }
    );
  }

  seeUser(username: string) {
    this.router.navigate(['/user', username]);
  }
}
