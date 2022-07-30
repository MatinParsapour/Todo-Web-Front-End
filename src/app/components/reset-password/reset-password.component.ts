import { NotificationService } from 'src/app/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { slideToDown } from './../../animations';
import { FormValidator } from './../register/FormValidator';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations: [slideToDown],
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: UntypedFormGroup;
  email: any;
  code: any;
  isPageValid!: boolean;
  error!: HttpErrorResponse;
  isLoading: boolean = false;

  constructor(
    fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private notifier: NotificationService,
    private router: Router
  ) {
    this.resetPassword = fb.group(
      {
        email: new UntypedFormControl(),
        password: new UntypedFormControl('', [
          Validators.required,
          FormValidator.passwordIsWeak,
        ]),
        reTypePassword: new UntypedFormControl('', [Validators.required]),
      },
      {
        validator: FormValidator.passwordsDoNotMatch,
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.code = params['code'];
    });
    this.resetPasswordService.isEmailValid(this.email, this.code).subscribe(
      (response: any) => {
        this.isPageValid = true;
      },
      (error: HttpErrorResponse) => {
        this.isPageValid = false;
        this.error = error.error;
      }
    );
  }

  get password(): any {
    return this.resetPassword.get('password');
  }
  get reTypePassword(): any {
    return this.resetPassword.get('reTypePassword');
  }
  get isMinimum() {
    return FormValidator.isMinimum;
  }
  get hasNumber() {
    return FormValidator.hasNumber;
  }
  get hasLowerCase() {
    return FormValidator.hasLowerCase;
  }
  get hasUpperCase() {
    return FormValidator.hasUpperCase;
  }
  get hasSpecialCharacters() {
    return FormValidator.hasSpecialCharacters;
  }

  getPasswordErrorMessages() {
    if (this.password.hasError('required')) {
      return 'You must enter value';
    }
    return 'Create a stronger password';
  }

  changePassword() {
    this.resetPassword.get('email')?.setValue(this.email);
    this.isLoading = true;
    this.resetPasswordService
      .update('change-password', this.resetPassword.value)
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'Your password has been changed'
          );
          this.isLoading = false;
          this.router.navigateByUrl('/login');
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.message);
          this.isLoading = false;
        }
      );
  }
}
