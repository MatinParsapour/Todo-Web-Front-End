import { slideToDown } from './../../animations';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './../../services/login/login.service';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-facebook-sign-in',
  templateUrl: './facebook-sign-in.component.html',
  styleUrls: ['./facebook-sign-in.component.css'],
  animations: [slideToDown],
})
export class FacebookSignInComponent implements OnInit {
  user: UntypedFormGroup;
  socialUser!: SocialUser;
  isLoggedin!: boolean;

  constructor(
    private socialAuthService: SocialAuthService,
    private fb: UntypedFormBuilder,
    private loginSerivce: LoginService,
    private notifier: NotificationService,
    private router: Router
  ) {
    this.user = fb.group({
      firstName: new UntypedFormControl(''),
      lastName: new UntypedFormControl(''),
      userName: new UntypedFormControl(''),
      provider: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
    });
  }

  ngOnInit(): void {
    this.authenticateUserForSignIn();
  }

  authenticateUserForSignIn() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  loginWithFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(() => {
        this.initializeUser();
        this.signInUser();
      });
  }

  initializeUser() {
    this.user.get('firstName')?.setValue(this.socialUser.firstName);
    this.user.get('lastName')?.setValue(this.socialUser.lastName);
    this.user.get('email')?.setValue(this.socialUser.email);
    this.user.get('password')?.setValue('MMmm11!!11');
    this.user.get('userName')?.setValue(this.socialUser.email);
    this.user.get('provider')?.setValue(this.socialUser.provider);
  }

  signInUser() {
    this.loginSerivce.create('/sign-in', this.user.value).subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, 'You are logged in');
        this.router.navigateByUrl('/' + response.userName);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type +
              ': ' +
              error.error.message +
              ', you can contact support matin.parsapour.iam@gmail.com'
          );
        } else {
          this.notifier.notify(NotificationType.ERROR, 'Something went wrong');
        }
      }
    );
  }
}
