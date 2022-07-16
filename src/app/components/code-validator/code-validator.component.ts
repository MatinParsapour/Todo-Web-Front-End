import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification/notification.service';
import { PhoneNumberService } from './../../services/phone-number/phone-number.service';
import { UntypedFormControl, Validators } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ElementRef,
} from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-code-validator',
  templateUrl: './code-validator.component.html',
  styleUrls: ['./code-validator.component.css'],
})
export class CodeValidatorComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;

  constructor(
    private phoneNumberService: PhoneNumberService,
    private notifier: NotificationService,
    private dialog: MatDialog,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const inputs = this.elementRef.nativeElement.querySelectorAll('.code');
    inputs[0].focus();

    inputs.forEach((input: any, i: any) => {
      input.addEventListener('keydown', (e: any) => {
        if (e.key >= 0 && e.key < 10) {
          this.code.setValue(this.code.value + e.key);
          setTimeout(() => {
            if (i + 1 < inputs.length) {
              inputs[i + 1].focus();
            }
          }, 10);
        } else if (
          e.keyCode === 8 &&
          i === inputs.length - 1 &&
          inputs[i].value !== ''
        ) {
          this.removeLastDigit(this.code.value);
          setTimeout(() => {
            inputs[i].focus();
            inputs[i].value = '';
          }, 10);
        } else if (e.keyCode === 8) {
          this.removeLastDigit(this.code.value);
          setTimeout(() => {
            if (i - 1 >= 0) {
              inputs[i - 1].focus();
              inputs[i - 1].value = '';
            }
          }, 10);
        }
        console.log(this.code.value);
      });
    });
  }

  removeLastDigit(code: number) {
    var charCode = code.toString();
    charCode = charCode.substring(0, charCode.length - 1);
    this.code.setValue(charCode);
  }

  code = new UntypedFormControl('', [
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

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    let result = confirm('Are you sure you want to reload page');
    if (result) {
      window.opener.location.reload();
    }
    event.returnValue = false;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    let result = confirm('Are you sure you want to reload page');
    if (result) {
      window.opener.location.reload();
    }
    event.returnValue = false;
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
          if (error.status === 406) {
            this.notifier.notify(
              NotificationType.ERROR,
              error.error.type + ': ' + error.error.message
            );
          } else {
            console.log(error);
          }
          this.isLoading = false;
        }
      );
  }

  resendCode() {
    this.isLoading = true;
    this.phoneNumberService.isCodeValid('/phone/resend-code').subscribe(
      (response: any) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'New code sent to your phone number'
        );
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
