import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-followers-followings',
  templateUrl: './followers-followings.component.html',
  styleUrls: ['./followers-followings.component.css'],
})
export class FollowersFollowingsComponent implements OnInit {
  isDisplay = false;
  list: any;
  type = '';
  @Output('update') update = new EventEmitter();

  constructor(
    private userService: UserService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {}

  open(list: any, type: string) {
    this.type = type;
    this.list = list;
    this.isDisplay = true;
  }

  close() {
    this.isDisplay = false;
    this.list = [];
  }

  removeOrUnFollow(userId: string){
    if (this.type === 'followers') {
      this.unFollow(userId);
    } else {
      this.removeFromFollowings(userId);
    }
  }

  removeFromFollowings(followingId: string) {
    const formData = new FormData();
    const userId = localStorage.getItem('username');
    if (userId) {
      formData.append('userId', userId);
    }
    formData.append('followingId', followingId);
    this.userService.update('/user/remove-from-followings', formData).subscribe(
      (response) => {
        this.update.emit();
        this.close()
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }

  unFollow(follwerId: string) {
    const formData = new FormData();
    const userId = localStorage.getItem('username');
    if (userId) {
      formData.append('userId', userId);
    }
    formData.append('followerId', follwerId);
    this.userService.update('/user/unfollow', formData).subscribe(
      (response) => {
        this.update.emit();
        this.close()
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }
}
