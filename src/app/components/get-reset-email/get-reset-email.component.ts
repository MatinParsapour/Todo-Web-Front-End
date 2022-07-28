import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification/notification.service';
import { ForgetPasswordService } from './../../services/forget-password/forget-password.service';
import { IsEmailExists } from './is-email-exists.validator';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-get-reset-email',
  templateUrl: './get-reset-email.component.html',
  styleUrls: ['./get-reset-email.component.css'],
})
export class GetResetEmailComponent implements OnInit {
  field: UntypedFormGroup;
  isLoading: boolean = false;

  constructor(fb: UntypedFormBuilder, 
    private isEmailExists: IsEmailExists,
    private dialog: MatDialog,
    private forgetPasswordService: ForgetPasswordService,
    private notifier: NotificationService) {
    this.field = fb.group({
      email: new UntypedFormControl(
        '',
        [Validators.required, Validators.email],
        this.isEmailExists.validate
      ),
    });
  }

  ngOnInit(): void {}

  get email():any {return this.field.get('email')}

  getEmailErrorMessages(){
    if (this.email.hasError('required')) {
      return "You must enter a value"
    }
    if (this.email.hasError('emailExists')) {
      return 'Email already exists';
    }
    return "The email is not valid"
  }

  sendEmail(){
    const formData = new FormData()
    let username = localStorage.getItem("username")
    if (username !== null) {
      formData.append("userId",username)
    }
    formData.append("newEmail",this.email.value)
        this.isLoading = true;
        this.forgetPasswordService
          .sendResetEmail(formData)
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
              this.notifier.notify(NotificationType.ERROR, error.message);
            }
          );
  }

  closeDialog(){
    this.dialog.closeAll()
  }
}
