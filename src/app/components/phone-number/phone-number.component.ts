import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification/notification.service';
import { PhoneNumberService } from './../../services/phone-number/phone-number.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhoneErrorMatcher } from './phone-error-matcher';
import { ISO_3166_1_CODES } from './iso-phone-number-codes';
import { PhoneValidator } from './phone-number.validator';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import PhoneNumber from 'awesome-phonenumber';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css'],
})
export class PhoneNumberComponent implements OnInit {
  countyCodes = ISO_3166_1_CODES;
  isLoading: boolean = false;
  username = '';
  profileForm = this.fb.group({
    phone: this.fb.group(
      {
        country: ['US'],
        number: '',
      },
      {
        validators: PhoneValidator.phoneValidator,
      }
    ),
  });

  phoneErrorMatcher = new PhoneErrorMatcher();

  constructor(
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialog: MatDialog,
    private phoneNumberService: PhoneNumberService,
    private notifier: NotificationService
  ) {
    this.username = data.username
  }

  ngOnInit(): void {}

  formatNumber(){
    const natNum = this.phoneNumber.getNumber('national');
    this.phoneNumberControl.setValue(natNum ? natNum : this.phoneNumberDigits);
  }

  updatePhoneNumber() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('phoneNumber', this.phoneNumberControl.value);
    let username = this.username;
    if (username !== null) {
      formData.append('userId', username);
    }
    this.phoneNumberService
      .update('/phone/update-phone-number', formData)
      .subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'Code sent to your phone number'
          );
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  get phoneNumberDigits(): string {
    return this.phoneNumberControl.value.replace(/\D/g, '');
  }
  get phoneNumber(): PhoneNumber {
    return new PhoneNumber(
      this.phoneNumberDigits,
      this.phoneCountryControl.value
    );
  }
  get phoneHint(): string {
    return PhoneNumber.getExample(this.phoneCountryControl.value).getNumber(
      'national'
    );
  }
  get phoneE164(): string {
    return this.phoneNumber.getNumber('e164');
  }
  get phoneGroup(): any {
    return this.profileForm.get('phone');
  }
  get phoneCountryControl(): any {
    return this.profileForm.get('phone.country');
  }
  get phoneNumberControl(): any {
    return this.profileForm.get('phone.number');
  }
}
