import { Router } from '@angular/router';
import { NotificationService } from './../../services/notification/notification.service';
import { LoginService } from './../../services/login/login.service';
import { CaptchaComponent } from './../captcha/captcha.component';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToDown],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  user: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    private loginService: LoginService,
    private notifier: NotificationService,
    private router: Router
  ) {
    this.user = fb.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnInit(): void {}

  showResult() {
    this.isLoading = true;
    this.loginService.create('/log-in', this.user.value).subscribe(
      (response: any) => {
        if (response !== null) {
          this.notifier.notify(NotificationType.SUCCESS, 'You are logged in');
          this.router.navigateByUrl('/main')
        } else {
          this.notifier.notify(NotificationType.ERROR,'Username or password is wrong');
        }
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR,error.message);
        this.isLoading = false;
      }
    );
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
}
