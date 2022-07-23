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

  displayAccessLevelInfo(value: any) {
    if (value === 'PRIVATE') {
      this.accessLevelInfo = this.accessLevelsInfo[2];
    } else if (value === 'PROTECTED')
      this.accessLevelInfo = this.accessLevelsInfo[1];
    else if ((value = 'PUBLIC')) {
      this.accessLevelInfo = this.accessLevelsInfo[0];
    }
  }

  hideAccessLevelInfo() {
    this.accessLevelInfo = { type: '', info: '' };
  }

  isPrivate(): boolean {
    return this.user.accessLevel.toString() == AccessLevel[AccessLevel.PRIVATE];
  }

  isProtected(): boolean {
    return (
      this.user.accessLevel.toString() == AccessLevel[AccessLevel.PROTECTED]
    );
  }

  isPublic(): boolean {
    return this.user.accessLevel.toString() == AccessLevel[AccessLevel.PUBLIC];
  }

  getUser() {
    this.settingsService.getUser(this.username, 'account-info').subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
        console.log(error);
      }
    );
  }

  updateUser() {
    this.settingsService
      .update('settings/update/account-info' , this.user)
      .subscribe(
        (response: any) => {
          this.notifier.notify(NotificationType.SUCCESS, 'You data updated');
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        },
        () => {
          this.getUser();
        }
      );
  }
}
