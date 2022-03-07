import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification/notification.service';
import { PhoneNumberService } from './../../services/phone-number/phone-number.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-code-validator',
  templateUrl: './code-validator.component.html',
  styleUrls: ['./code-validator.component.css'],
})
export class CodeValidatorComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private phoneNumberService: PhoneNumberService,
    private notifier: NotificationService,
    private dialog: MatDialog
  ) {}

  code = new FormControl('', [
    Validators.required,
    Validators.min(10000),
    Validators.max(99999),
  ]);

  ngOnInit(): void {}

  getCodeErrorMessages() {
    if (this.code.hasError('required')) {
      return 'You must enter code';
    }
    return 'You must enter exactly 5 numbers';
  }

  validateCode() {
    this.isLoading = true;
    this.phoneNumberService
      .isCodeValid('/phone/check-code/' + this.code.value)
      .subscribe(
        (response: any) => {
          if (response === true) {
            this.notifier.notify(
              NotificationType.SUCCESS,
              'The code was valid, your profile updated'
            );
            this.code.setValue(null);
            this.dialog.closeAll();
          } else {
            this.notifier.notify(
              NotificationType.ERROR,
              'The code was invalid, new code sent to your phone'
              );
            this.code.setValue(null);
          }
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  resendCode() {
    this.isLoading = true;
    this.phoneNumberService.isCodeValid('/phone/resend-code').subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, "New code sent to your phone number")
        this.code.setValue(null);
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
