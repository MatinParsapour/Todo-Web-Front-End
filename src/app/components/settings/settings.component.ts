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
  settingsType: any;
  user!: User;
  isLoading = false;
  public profileImage: any;
  uploaded = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private userService: UserService,
    private notifier: NotificationService,
    private dialog: MatDialog,
    private router: Router,
    private cookiesService: CookieService
  ) {}

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    this.settingsService.setUsername(this.username);
    this.settingsType = this.activatedRoute.snapshot.params['settingsType'];
    // this.getUser();
  }

  loadComponent(component: any) {
    component.node = this.username;
  }

  logout() {
    this.cookiesService.deleteAll()
    this.router.navigateByUrl('/login');
  }

  openDeleteAccountAgreement() {
    this.dialog
      .open(AggreementComponent, {
        data: { title: 'Are you sure you want to delete your account' },
      })
      .afterClosed()
      .subscribe((response: any) => {
        if (response === 'Yes') {
          this.deleteAccount();
          this.cookiesService.deleteAll();
        }
      });
  }

  deleteAccount() {
    this.userService
      .delete('/user/delete-account/' + localStorage.getItem('username'))
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'Your account deleted successfully'
          );
          this.dialog.closeAll();
          localStorage.clear();
          this.router.navigateByUrl('/login');
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            "Something went wrong your account didn't delete"
          );
          console.log(error);
        }
      );
  }
}
