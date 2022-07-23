import { NotificationService } from './../../../services/notification/notification.service';
import { SettingsService } from './../../../services/settings/settings.service';
import { UserService } from './../../../services/user/user.service';
import { User } from './../../../classes/user';
import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  username!: string;
  user!: User;
  profileImage: any;
  uploaded!: number;
  bioLength = 300;

  constructor(
    private userService: UserService,
    private settingsService: SettingsService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
    this.username = this.settingsService.getUsername()
  }

}
