import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { slideToDown } from './../../animations';
import { UserService } from './../../services/user/user.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SettingsService } from './../../services/settings/settings.service';
import { User } from 'src/app/classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { AccessLevel } from 'src/app/enum/access-level';
import { GetResetEmailComponent } from '../get-reset-email/get-reset-email.component';
import { PhoneNumberComponent } from '../phone-number/phone-number.component';
import { CodeValidatorComponent } from '../code-validator/code-validator.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { AggreementComponent } from '../aggreement/aggreement.component';
import { Provider } from 'src/app/enum/provider';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  username: any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    this.settingsService.setUsername(this.username);
  }
}
