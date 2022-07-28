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

  constructor() { }

  ngOnInit(): void {
  }

}
