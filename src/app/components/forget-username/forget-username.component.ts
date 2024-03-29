import { ThemeService } from './../../services/theme/theme.service';
import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user/user.service';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.css'],
})
export class ForgetUsernameComponent implements OnInit {
  @Output('close') close = new EventEmitter();
  isLoading = false;
  isEnterEmailOrPhoneEditable = true;
  isCheckCodeEditable = false;
  isUsernameInputEditable = false;
  isDark!: boolean
  emailOrPhone = new UntypedFormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.minLength(3),
  ]);
  code = new UntypedFormControl({ value: '', disabled: true }, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(5),
  ]);
  username = new UntypedFormControl({ value: '', disabled: true }, [
    Validators.required,
    Validators.minLength(5),
  ]);

  constructor(
    private userService: UserService,
    private notifier: NotificationService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isDark = this.themeService.isThemeDark()
  }

  sendCode() {
    const formData = new FormData();
    formData.append('emailOrPhoneNumber', this.emailOrPhone.value);
    this.isLoading = true;
    this.userService.create('/user/forget-username', formData).subscribe(
      (response: any) => {
        this.disableEmailOrPhoneNumberFormControl();
        this.enableCodeFormControl();
        this.notifier.notify(
          NotificationType.SUCCESS,
          'Code has sent to ' + this.emailOrPhone.value
        );
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
  checkCode() {
    const formData = new FormData();
    formData.append('emailOrPhoneNumber', this.emailOrPhone.value);
    formData.append('code', this.code.value);
    this.isLoading = true;
    this.userService.create('/user/forget-username-code', formData).subscribe(
      (response: any) => {
        this.disableCodeFormControl();
        this.enableUsernameFormControl();
        this.notifier.notify(
          NotificationType.SUCCESS,
          'The code was correct, change your username'
        );
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

  changeUsername() {
    const formData = new FormData();
    formData.append('emailOrPhoneNumber', this.emailOrPhone.value);
    formData.append('newUsername', this.username.value);
    this.isLoading = true;
    this.userService.create('/user/change-username', formData).subscribe(
      (response: any) => {
        this.close.emit(this.username.value);
        this.notifier.notify(NotificationType.SUCCESS, 'Your username changed');
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

  disableEmailOrPhoneNumberFormControl() {
    this.isEnterEmailOrPhoneEditable = false;
    this.emailOrPhone.disable();
  }

  enableCodeFormControl() {
    this.isCheckCodeEditable = true;
    this.code.enable();
  }

  disableCodeFormControl() {
    this.isCheckCodeEditable = false;
    this.code.disable();
  }

  enableUsernameFormControl() {
    this.isUsernameInputEditable = true;
    this.username.enable();
  }
}
