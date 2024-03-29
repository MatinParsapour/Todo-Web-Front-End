import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { NotificationService } from './../../services/notification/notification.service';
import { LoginService } from './../../services/login/login.service';
import { ForgetPasswordComponent } from './../forget-password/forget-password.component';
import { slideToDown } from './../../animations';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToDown],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  user: UntypedFormGroup;
  siteKey: string = '6Lc7ct0eAAAAAD0Jqa_1Eih2MiucxWAGsDpRpOVn';
  socialUser!: SocialUser;
  isLoggedin!: boolean;
  displayPopup = false;
  isForgetUsernameModalVisible = false;
  cookieUsername = '';

  constructor(
    fb: UntypedFormBuilder,
    private dialog: MatDialog,
    private loginService: LoginService,
    private notifier: NotificationService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.user = fb.group({
      userName: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      recaptcha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.redirectToMainIfUserSignedIn();
    this.getUser();
    this.canNavigateToMain();
  }

  redirectToMainIfUserSignedIn() {
    const username = localStorage.getItem('username');
    if (username !== null) {
      this.router.navigateByUrl('/main');
    }
  }

  login() {
    this.isLoading = true;
    this.saveUser();
    this.loginService.create('/log-in', this.user.value).subscribe(
      (response: any) => {
        if (response !== null) {
          this.notifier.notify(NotificationType.SUCCESS, 'You are logged in');
          this.router.navigateByUrl('/' + response.userName);
        } else {
          this.notifier.notify(
            NotificationType.ERROR,
            'Username or password is wrong'
          );
        }
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
        this.isLoading = false;
        if (error.status === 403) {
          this.showPopup();
        }
      }
    );
  }

  saveUser() {
    this.cookieService.put('username', this.user.get('userName')?.value);
  }

  canNavigateToMain() {
    if (this.isUserExists()) {
      this.router.navigateByUrl(this.cookieUsername);
    }
  }

  isUserExists(): boolean {
    if (this.cookieUsername == '') {
      return false;
    }
    return true;
  }

  getUser() {
    var username = this.cookieService.get('username');
    if (username != undefined) {
      this.cookieUsername = username;
    }
  }

  showPopup() {
    this.displayPopup = true;
    setTimeout(() => (this.displayPopup = false), 5000);
  }

  getUsernameErrorMessages() {
    if (this.username.hasError('minlength')) {
      return 5 - this.username.value.length + ' more character(s)';
    }
    if (this.username.hasError('required')) {
      return 'Username is required';
    }
    return null;
  }

  getPasswordErrorMessages() {
    if (this.password.hasError('minlength')) {
      return 10 - this.password.value.length + ' more charater(s)';
    }
    if (this.password.hasError('required')) {
      return 'password is required';
    }
    return null;
  }

  openForgetPassword() {
    this.dialog.open(ForgetPasswordComponent);
  }

  get username(): any {
    return this.user.get('userName');
  }
  get password(): any {
    return this.user.get('password');
  }
  get recaptcha(): any {
    return this.user.get('recaptcha');
  }
}
