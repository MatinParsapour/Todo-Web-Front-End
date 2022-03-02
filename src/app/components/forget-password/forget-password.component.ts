import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
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

  constructor(private notifier: NotificationService, private dialog: MatDialog) {}

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {}

  getEmailErrorMessages() {
    if (this.email.hasError('required')) {
      return 'Email is mandatory';
    }
    return 'Email is invalid';
  }

  sendEmail() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.notifier.notify(
        NotificationType.SUCCESS,
        'Email sent to ' + this.email.value
        );
        this.closeDialog()
    }, 5000);
  }

  closeDialog(){
    this.dialog.closeAll()
  }
}
