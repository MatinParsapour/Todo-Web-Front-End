import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user/user.service';
import { FollowService } from './../../../services/follow/follow.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.css']
})
export class FollowingsComponent implements OnInit {
  username = '';
  followings: User[] = [];

  constructor(
    private followService: FollowService,
    private userService: UserService,
    private notifier: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.followService.getUsername();
    this.getFollowings();
  }

  getFollowings() {
    this.userService.getAll('/user/get-followings/' + this.username).subscribe(
      (response: any) => {
        this.followings = response;
        console.log(this.followings);
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

  unFollow(username: string) {
    console.log(username);
    
  }
}
