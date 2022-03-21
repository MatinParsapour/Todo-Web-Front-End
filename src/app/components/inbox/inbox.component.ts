import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification/notification.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { InboxService } from './../../services/email-service/inbox/inbox.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { EmailDetailsComponent } from '../email-details/email-details.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  dataSource: any;

  constructor(
    private inboxService: InboxService,
    private router: Router,
    private notifier: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllInbox()
  }

  displayedColumns: string[] = ['from', 'to', 'date', 'message'];

  emailDetails(element: any) {
    this.dialog.open(EmailDetailsComponent, { data: { emailId: element } });
  }

  getAllInbox() {
    this.inboxService
      .getAllInbox('inbox/' + localStorage.getItem('username'))
      .subscribe(
        (response: any) => {
          this.dataSource = response;
          this.notifier.notify(NotificationType.SUCCESS, 'Data updated');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.notifier.notify(NotificationType.ERROR, error.error);
        }
      );
  }

  backToMain() {
    this.router.navigateByUrl('/main');
  }
}
