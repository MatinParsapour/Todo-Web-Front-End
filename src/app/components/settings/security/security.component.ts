import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from './../../../classes/user';
import { NotificationService } from './../../../services/notification/notification.service';
import { SettingsService } from './../../../services/settings/settings.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { Provider } from 'src/app/enum/provider';
import { GetResetEmailComponent } from '../../get-reset-email/get-reset-email.component';
import { PhoneNumberComponent } from '../../phone-number/phone-number.component';
import { CodeValidatorComponent } from '../../code-validator/code-validator.component';
import { ForgetPasswordComponent } from '../../forget-password/forget-password.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent implements OnInit {
  username!: string;
  user!: User;
  isVisible = false;
  isForgetUsernameModalVisible = false;

  constructor(
    private settingsService: SettingsService,
    private notifier: NotificationService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.settingsService.getUsername()
    this.getUser()
  }

  isUserProviderGoogle(): boolean {
    return this.user.provider.toString() == Provider[Provider.GOOGLE];
  }

  isUserProviderFacebook(): boolean {
    return this.user.provider.toString() == Provider[Provider.FACEBOOK];
  }

  isUserProviderEmail(): boolean {
    return this.user.provider.toString() == Provider[Provider.EMAIL];
  }

  getUser() {
    this.settingsService.getUser(this.username, 'security-info').subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
      },
    );
  }

  }

}
