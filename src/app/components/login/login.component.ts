import { Router } from '@angular/router';
import { NotificationService } from './../../services/notification/notification.service';
import { LoginService } from './../../services/login/login.service';
import { ForgetPasswordComponent } from './../forget-password/forget-password.component';
import { slideToDown } from './../../animations';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';
import {
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToDown],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  user: FormGroup;
  siteKey: string = '6Lc7ct0eAAAAAD0Jqa_1Eih2MiucxWAGsDpRpOVn';
  socialUser!: SocialUser;
  isLoggedin!: boolean;
  displayPopup = false

  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    private loginService: LoginService,
    private notifier: NotificationService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.user = fb.group({
      emailOrPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      recaptcha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.redirectToMainIfUserSignedIn();
  }

  redirectToMainIfUserSignedIn() {
    const username = localStorage.getItem('username');
    if (username !== null) {
      this.router.navigateByUrl('/main');
    }
  }

  updateLocalStorage(user: any) {
    localStorage.setItem('username', user.id);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('role', user.role);
  }

  login() {
    this.isLoading = true;
    this.loginService.create('/log-in', this.user.value).subscribe(
      (response: any) => {
        if (response !== null) {
          this.notifier.notify(NotificationType.SUCCESS, 'You are logged in');
          this.updateLocalStorage(response);
          this.router.navigateByUrl('/main');
        } else {
          this.notifier.notify(
            NotificationType.ERROR,
            'Username or password is wrong'
          );
        }
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
        this.isLoading = false;
        if (error.status === 403) {
          this.showPopup()
        }
      }
    );
  }

  showPopup(){
    this.displayPopup = true
    setTimeout(() => this.displayPopup = false, 5000)
  }

  getUsernameErrorMessages() {
    if (this.emailOrPhone.hasError('minlength')) {
      return 5 - this.emailOrPhone.value.length + ' more character(s)';
    }
    if (this.emailOrPhone.hasError('required')) {
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

  get emailOrPhone(): any {
    return this.user.get('emailOrPhone');
  }
  get password(): any {
    return this.user.get('password');
  }
  get recaptcha(): any {
    return this.user.get('recaptcha');
  }
}
