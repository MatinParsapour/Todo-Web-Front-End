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
export class TagComponent implements OnInit {
  tagName = ''
  tag!: Tag
  username!: string

  constructor(private tagService: TagService,
              private activatedRoute: ActivatedRoute,
              private notifier: NotificationService,
              private cookieService: CookieService) {
              }

  ngOnInit(): void {
    this.tagName = this.activatedRoute.snapshot.params['name'];
    this.getTag()
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

}
