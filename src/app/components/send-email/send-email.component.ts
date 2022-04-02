import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationType } from 'src/app/enum/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SendEmailService } from 'src/app/services/send-email/send-email.service';
import { ForgetPasswordEmailValidator } from './../forget-password/forget-password-email-validator';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
})
export class SendEmailComponent implements OnInit {
  email: FormGroup;
  isSending!: boolean;
  recommendations: any;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordEmailValidator: ForgetPasswordEmailValidator,
    private dialog: MatDialog,
    private sendEmailService: SendEmailService,
    private notifier: NotificationService
  ) {
    this.email = fb.group({
      to: new FormControl(
        '',
        [Validators.required, Validators.email],
        this.forgetPasswordEmailValidator.validate
      ),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
  ngOnInit(): void {}

  getEmailErrorMessages() {
    if (this.to.hasError('required')) {
      return 'Email is mandatory';
    }
    if (this.to.hasError('emailIsNotAvailable')) {
      return 'The email has not been defined';
    }
    return 'Email is invalid';
  }
  getMessageErrorMessages() {
    if (this.message.hasError('required')) {
      return 'message is mandatory';
    }

    return 10 - this.message.value.length + ' more character';
  }

  get to(): any {
    return this.email.get('to');
  }

  get message(): any {
    return this.email.get('message');
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  getRecommendation() {
    this.sendEmailService
      .getAll('user-email/get-recommendation/' + this.email.get('to')?.value)
      .subscribe(
        (response: any) => {
          this.recommendations = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  sendEmail() {
    this.isSending = true;
    this.sendEmailService
      .sendEmail(
        localStorage.getItem('username') +
          '/' +
          this.to.value +
          '/' +
          this.message.value
      )
      .subscribe(
        (response: any) => {
          this.notifier.notify(NotificationType.SUCCESS, 'Your email sent');
          this.closeDialog();
          this.isSending = false;
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.error);
          this.closeDialog();
          this.isSending = false;
        }
      );
  }

  selectEmail(email: string) {
    this.email.get('to')?.setValue(email);
    this.recommendations = undefined;
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent){
    if ((event.ctrlKey || event.metaKey) && event.key == 'Enter') {
      document.getElementById("sendEmail")?.click()
    }
  }
}
