import { FormControl } from '@angular/forms';
import { EmailDetailsComponent } from './../email-details/email-details.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification/notification.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OutboxService } from './../../services/email-service/outbox/outbox.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css'],
})
export class OutboxComponent implements OnInit {
  dataSource = new MatTableDataSource();
  search = new FormControl('')

  constructor(
    private outboxService: OutboxService,
    private router: Router,
    private notifier: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllOutbox();
  }

  displayedColumns: string[] = ['from', 'to', 'date', 'message'];

  emailDetails(element: any) {
    this.dialog
      .open(EmailDetailsComponent, { data: { emailId: element } })
      .afterClosed()
      .subscribe(() => this.getAllOutbox());
  }

  applyFilter() {
    const filterValue = this.search.value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllOutbox() {
    this.outboxService
      .getAllOutbox('outbox/' + localStorage.getItem('username'))
      .subscribe(
        (response: any) => {
          this.dataSource.data = response;
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