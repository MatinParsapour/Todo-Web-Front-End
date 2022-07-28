import { HttpErrorResponse } from '@angular/common/http';
import { ForgetPasswordService } from './../../services/forget-password/forget-password.service';
import { ForgetPasswordEmailValidator } from './forget-password-email-validator';
import { MatDialog } from '@angular/material/dialog';
import {
  UntypedFormControl,
  Validators,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  isLoading = false;
  field: UntypedFormGroup;

  constructor(
    private notifier: NotificationService,
    private dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private forgetPasswordValidator: ForgetPasswordEmailValidator,
    private forgetPasswordService: ForgetPasswordService
  ) {
    this.field = fb.group({
      email: new UntypedFormControl(
        '',
        [Validators.required, Validators.email],
        this.forgetPasswordValidator.validate
      ),
    });
  }

  ngOnInit(): void {}

  getEmailErrorMessages() {
    if (this.email.hasError('required')) {
      return 'Email is mandatory';
    }
    if (this.email.hasError('emailIsNotAvailable')) {
      return 'The email has not been defined';
    }
    return 'Email is invalid';
  }

  get email(): any {
    return this.field.get('email');
  }

  sendEmail() {
    this.isLoading = true;
    this.forgetPasswordService
      .sendForgetPasswordEmail(this.email.value)
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          this.notifier.notify(
            NotificationType.SUCCESS,
            'Email sent to ' + this.email.value
          );
          this.closeDialog();
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.notifier.notify(
            NotificationType.ERROR,
            error.message
          );
        }
      );
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
