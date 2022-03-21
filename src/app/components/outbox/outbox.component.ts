import { NotificationService } from './../../services/notification/notification.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OutboxService } from './../../services/email-service/outbox/outbox.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent implements OnInit {
  dataSource: any

  constructor(private outboxService: OutboxService,
    private router: Router,
    private notifier: NotificationService) { }

  ngOnInit(): void {
    this.outboxService.getAllOutbox("outbox/" + localStorage.getItem("username")).subscribe(
      (response: any) => {
        this.dataSource = response
        this.notifier.notify(NotificationType.SUCCESS, "Data updated")
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.notifier.notify(NotificationType.ERROR, error.error)
      }
    )
  }

  displayedColumns: string[] = ['from','to','date','message']

  displayData(element:any){
    console.log(element);
  }

  backToMain(){
    this.router.navigateByUrl("/main")
  }
}
