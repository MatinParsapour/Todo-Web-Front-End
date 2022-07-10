import { MatDialog } from '@angular/material/dialog';
import { AggreementComponent } from './../aggreement/aggreement.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationType } from 'src/app/enum/notification-type';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/classes/user';
import { PhoneNumberComponent } from '../phone-number/phone-number.component';
import { CodeValidatorComponent } from '../code-validator/code-validator.component';
import { GetResetEmailComponent } from '../get-reset-email/get-reset-email.component';
import { AccessLevel } from 'src/app/enum/access-level';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user!: User;
  isLoading: boolean = false;
  public profileImage: any;
  fullScreen = false;
  observable: any;
  now = new Date();
  uploaded = 0;
  requests: any;

  constructor(
    private userService: UserService,
    private notifier: NotificationService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRouter.snapshot.params['id'];
    this.getUser();
    this.getRequests();
  }

  getUser() {
    this.isLoading = true;
    this.userService.getUser(this.userId).subscribe(
      (response: any) => {
        this.user = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;

        this.notifier.notify(
          NotificationType.ERROR,
          'Something went wrong by getting data, try again later'
        );
      }
    );
  }
  changeProfileImage(event: any) {
    this.profileImage = event.target.files[0];
    const formData = new FormData();
    formData.append('userId', this.userId);
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

  openPhoneNumberComponent() {
    return this.dialog
      .open(PhoneNumberComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result === 'send-code') {
          this.openCodeValidatorComponent().subscribe(() => {
            this.updateUser();
          });
        }
      });
  }

  openCodeValidatorComponent() {
    return this.dialog
      .open(CodeValidatorComponent, { disableClose: true })
      .afterClosed();
  }

  openGetResetEmailComponent() {
    return this.dialog.open(GetResetEmailComponent);
  }

  getRequests() {
    this.userService
      .getAll(
        '/follow-request/get-all-user-requests/' +
          localStorage.getItem('username')
      )
      .subscribe(
        (response) => {
          this.requests = response;
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

  changeAccessLevel(value: any){
    this.user.accessLevel = value.value
  }

  updateUser() {
    let date = new Date(this.user.birthDay);
    let pipe: DatePipe = new DatePipe('en-US');
    let birthday = pipe.transform(date, 'yyyy-MM-dd');

    this.user.birthDay = birthday;
    this.isLoading = true;
    this.userService.update('/user/update-user', this.user).subscribe(
      (response: any) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'You information updated'
        );
        this.user = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 406) {
          this.notifier.notify(
            NotificationType.ERROR,
            'The username you entered already exists'
          );
        } else {
          this.notifier.notify(NotificationType.ERROR, 'Something went wrong');
        }
        this.isLoading = false;
      }
    );
  }

  selectProfile() {
    this.clickButton('select-picture');
  }

  clickButton(tagId: any) {
    document.getElementById(tagId)?.click();
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

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  openDeleteAccountAggreement() {
    this.dialog
      .open(AggreementComponent, {
        data: { title: 'Are you sure you want to delete your account' },
      })
      .afterClosed()
      .subscribe((response: any) => {
        if (response === 'Yes') {
          this.deleteAccount();
        }
      });
  }

  openFullScreen() {
    this.fullScreen = true;
  }

  closeFullScreen() {
    this.fullScreen = false;
  }

  backToMain(){
    this.router.navigateByUrl('/main')
  }

  isPrivate(): boolean {
    return this.user.accessLevel.toString() == AccessLevel[AccessLevel.PRIVATE]
  }

  isProtected(): boolean {
    return this.user.accessLevel.toString() == AccessLevel[AccessLevel.PROTECTED]
  }

  isPublic(): boolean {
    return this.user.accessLevel.toString() == AccessLevel[AccessLevel.PUBLIC]
  }
}
