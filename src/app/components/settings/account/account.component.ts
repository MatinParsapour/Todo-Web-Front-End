import { NotificationService } from './../../../services/notification/notification.service';
import { SettingsService } from './../../../services/settings/settings.service';
import { User } from './../../../classes/user';
import { Component, Input, OnInit } from '@angular/core';
import { AccessLevel } from 'src/app/enum/access-level';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  username!: string;
  user!: User;
  accessLevelInfo!: { type: string; info: string };
  accessLevelsInfo = [
    {
      type: 'Public',
      info: 'By selecting this level of accessing, all of users around the world can see your ToDos',
    },
    {
      type: 'Protected',
      info: 'By selecting this level of accessing, only you and your followers can see your ToDos',
    },
    {
      type: 'Private',
      info: 'By selecting this level of accessing, only you can see your ToDos',
    },
  ];

  constructor(
    private settingsService: SettingsService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
    this.username = this.settingsService.getUsername();

  changeAccessLevel(value: any) {
    this.user.accessLevel = value.value;
    this.updateUser()
  }

  }

}
