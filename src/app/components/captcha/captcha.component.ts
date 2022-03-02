import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css'],
})
export class CaptchaComponent implements OnInit {
  captcha: string = '';
  alphabets = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
  userCaptchaValueEntered = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  url: any;
  ok: any = 'The captcha is ok';
  fail: any = 'The captcha is invalid';
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private notifier: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.url = data.url;
    this.ok = data.ok;
    this.fail = data.fail;
  }

  ngOnInit(): void {
    this.generate();
  }

  generate() {
    let first =
      this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
    let second = Math.floor(Math.random() * 10);
    let third = Math.floor(Math.random() * 10);
    let fourth =
      this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
    let fifth =
      this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
    let sixth = Math.floor(Math.random() * 10);
    let seventh =
      this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
    let eighth =
      this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
    let ninth = Math.floor(Math.random() * 10);
    let tenth = Math.floor(Math.random() * 10);
    this.captcha =
      first.toString() +
      second.toString() +
      third.toString() +
      fourth.toString() +
      fifth.toString() +
      sixth.toString() +
      seventh.toString() +
      eighth.toString() +
      ninth.toString() +
      tenth.toString();
  }

  check() {
    if (this.userCaptchaValueEntered.value === this.captcha) {
      this.notifier.notify(NotificationType.SUCCESS, this.ok);
      this.router.navigateByUrl(this.url);
      this.dialog.closeAll();
    } else {
      this.notifier.notify(NotificationType.ERROR, this.fail);
      this.generate();
    }
  }

  getUserCaptchaErrorMessages() {
    if (this.userCaptchaValueEntered.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.userCaptchaValueEntered.hasError('minlength')) {
      return 10 - this.userCaptchaValueEntered.value.length + ' more character';
    }
    return this.userCaptchaValueEntered.value.length - 10 + ' less character';
  }
}
