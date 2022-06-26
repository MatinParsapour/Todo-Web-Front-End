import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SettingsService } from './../../services/settings/settings.service';
import { User } from 'src/app/classes/user';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userId: any;
  user!: User
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['userId']
    this.getUser()
  }

  getUser(){
    this.isLoading = true
    this.settingsService.getUser(this.userId).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error)
      },
      () => {
        this.isLoading = false
      }
    )
  }

}
