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
  username: any;
  settingsType: any;
  user!: User;
  isLoading = false;
  public profileImage: any;
  uploaded = 0;
  isVisible = false;
  isForgetUsernameModalVisible = false;
  bioLength = 300;

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
    this.settingsType = this.activatedRoute.snapshot.params['settingsType'];
    this.getUser();
  }

  openGetResetEmailComponent() {
    return this.dialog.open(GetResetEmailComponent);
  }

  openPhoneNumberComponent() {
    return this.dialog
      .open(PhoneNumberComponent, {data: {username: this.username}})
      .afterClosed()
      .subscribe((result) => {
        if (result === 'send-code') {
          this.openCodeValidatorComponent().subscribe(() => {
            this.updateUser();
          });
        }
      });
  }

  openForgetPassword() {
    this.dialog.open(ForgetPasswordComponent);
  }

  openCodeValidatorComponent() {
    return this.dialog
      .open(CodeValidatorComponent, { disableClose: true })
      .afterClosed();
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

  backToMain() {
    this.router.navigateByUrl(this.username);
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

  changePhoneVisibility() {
    this.user.phoneVisible = !this.user.phoneVisible;
  }

  changeEmailVisibility() {
    this.user.emailVisible = !this.user.emailVisible;
  }

  getUser() {
    this.isLoading = true;
    this.settingsService.getUser(this.username, this.settingsType).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
      },
      () => {
        this.isLoading = false;
      }
    );
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

  selectProfile() {
    this.clickButton('select-picture');
  }

  clickButton(tagId: any) {
    document.getElementById(tagId)?.click();
  }

  changeProfileImage(event: any) {
    this.profileImage = event.target.files[0];
    const formData = new FormData();
    formData.append('userId', this.username);
    formData.append('profileImage', this.profileImage);
    this.userService.updateProfileImage(formData).subscribe(
      (event: HttpEvent<any>) => {
        this.reportUploadProgress(event);
        this.getUser();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  reportUploadProgress(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total) {
          this.uploaded = (100 * event.loaded) / event.total;
        }
        break;
      case HttpEventType.Response:
        if (event.status === 200) {
          this.user.profileImageUrl = '';
          this.user.profileImageUrl = `${event.body.profileImageUrl}`;
          this.user.profileImageUrl = `${
            event.body.profileImageUrl
          }?time=${new Date().getTime()}`;
          this.notifier.notify(
            NotificationType.SUCCESS,
            'Profile image updated'
          );
        } else {
          this.notifier.notify(
            NotificationType.ERROR,
            'Unable to upload image'
          );
          console.log(event);
        }
        break;
      default:
        this.uploaded = 0;
    }
  }

  closeForgetUsernameModal(value: any) {
    this.isForgetUsernameModalVisible = false;
    this.username = value;
    this.user.userName = value;
    this.router.navigate(['/' + value + '/settings/' + this.settingsType])
  }

  deleteProfile() {
    this.userService
      .delete('/user/delete-profile-image/' + localStorage.getItem('username'))
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'Your profile successfully deleted'
          );
          this.getUser();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  updateUser() {
    this.isLoading = true;
    this.settingsService
      .update('settings/update/' + this.settingsType, this.user)
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
          this.isLoading = false;
          this.getUser();
        }
      );
  }

  bio(value: any) {
    this.bioLength = 300 - value.value.length
    this.user.bio = value.value
  }

  isPersonalInfo(): boolean {
    return this.settingsType == 'personal-info';
  }

  isSecurityInfo(): boolean {
    return this.settingsType == 'security-info';
  }

  isAccountInfo(): boolean {
    return this.settingsType == 'account-info';
  }

  changeAccessLevel(value: any) {
    this.user.accessLevel = value.value;
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

  isUserProviderGoogle(): boolean {
    return this.user.provider.toString() == Provider[Provider.GOOGLE]
  }

  isUserProviderFacebook(): boolean {
    return this.user.provider.toString() == Provider[Provider.FACEBOOK]
  }

  isUserProviderEmail(): boolean {
    return this.user.provider.toString() == Provider[Provider.EMAIL]
  }
}
