import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../../services/notification/notification.service';
import { UserService } from './../../../services/user/user.service';
import { FollowService } from './../../../services/follow/follow.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  username = '';
  tags: any[] = [];

  constructor(
    private followService: FollowService,
    private userService: UserService,
    private notifier: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
  getTags() {
    this.userService.getAll('/user/get-tags/' + this.username).subscribe(
      (response: any) => {
        this.tags = response;
        console.log(this.tags);
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ' ' + error.error.message
        );
      }
    );
  }

  seeTag(tagName: string) {
    this.router.navigate(['/tag', tagName]);
  }

  unFollow(tag: any) {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('tagName', tag);    
    this.userService.update('/user/un-follow-tag', formData).subscribe(
      (response: any) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'You successfully Unfollowed tag'
        );
        this.getTags();
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }
}
