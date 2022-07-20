import { UserService } from './../../services/user/user.service';
import { CookieService } from 'ngx-cookie';
import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Tag } from './../../classes/tag';
import { ActivatedRoute } from '@angular/router';
import { TagService } from './../../services/tag/tag.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
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
    this.getTag()
    this.getUsername()
  }

  getTag(){
    this.tagService
      .getAll('/get-tag/' + encodeURIComponent(this.tagName))
      .subscribe(
        (response: any) => {
          this.tag = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);

          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        }
      );
  }

  getUsername(){
    var username = this.cookieService.get('username')
    if (username) {
      this.username = username
    }
  }

  follow(){
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('tagName', this.tag.name)
    this.userService.update('/user/follow-tag', formData).subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, "You successfully followed tag")
      }, 
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error)
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
