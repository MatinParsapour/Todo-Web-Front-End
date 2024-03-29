import { UserService } from './../../services/user/user.service';
import { CookieService } from 'ngx-cookie';
import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Tag } from './../../classes/tag';
import { ActivatedRoute, Params } from '@angular/router';
import { TagService } from './../../services/tag/tag.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit, AfterViewInit {
  tagName = '';
  tag!: Tag;
  username!: string;
  isTagFollowedByUser = false;

  constructor(
    private tagService: TagService,
    private activatedRoute: ActivatedRoute,
    private notifier: NotificationService,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngAfterViewInit(): void {
    this.isTagFollowed();
  }

  ngOnInit(): void {
    this.tagName = this.activatedRoute.snapshot.params['name'];
    this.activatedRoute.params.subscribe((params: Params) => {
      this.tagName = params['name']
      this.getTag()
    })
    this.getTag();
    this.getUsername();
  }

  getTag() {
    this.tagService
      .getAll('/get-tag/' + encodeURIComponent(this.tagName))
      .subscribe(
        (response: any) => {
          this.tag = response;
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        }
      );
  }

  getUsername() {
    var username = this.cookieService.get('username');
    if (username) {
      this.username = username;
    }
  }

  follow() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('tagName', this.tag.name);
    this.userService.update('/user/follow-tag', formData).subscribe(
      (response: any) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'You successfully followed tag'
        );
        this.isTagFollowed();
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }

  toggleFollow() {
    if (this.isTagFollowedByUser) {
      this.unFollow();
    } else {
      this.follow();
    }
  }

  unFollow() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('tagName', this.tag.name);
    this.userService.update('/user/un-follow-tag', formData).subscribe(
      (response: any) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'You successfully Unfollowed tag'
        );
        this.isTagFollowed();
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }

  isTagFollowed() {
    this.userService
      .getAll(
        '/user/is-tag-followed/' +
          this.username +
          '/' +
          encodeURIComponent(this.tag.name)
      )
      .subscribe((response: any) => {
        this.isTagFollowedByUser = response;
      });
  }
}
