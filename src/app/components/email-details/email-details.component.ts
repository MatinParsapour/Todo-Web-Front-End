import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmailDetailsService } from './../../services/emai-details/email-details.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.css'],
})
export class EmailDetailsComponent implements OnInit {
  emailId: any;
  email: any

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private emailDetailsService: EmailDetailsService,
    private notifier: NotificationService,
    private dialog: MatDialog
  ) {
    this.emailId = data.emailId;
  }

  ngOnInit(): void {
    this.getEmailDetails()
  }

  getEmailDetails() {
    this.emailDetailsService
      .getEmailDetails('email/' + this.emailId)
      .subscribe(
        (response: any) => {
          this.email = response
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.notifier.notify(NotificationType.ERROR, error.error)
        }
      );
  }

  closeDialog(){
    this.dialog.closeAll()
  }

  deleteEmail(emailId: any){
    this.emailDetailsService.delete("/user-email/delete-email/" + emailId).subscribe(
      (response:any) => {
        this.notifier.notify(NotificationType.SUCCESS, "Email deleted")
        this.closeDialog()
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error)
      }
    )
    
  }
}
