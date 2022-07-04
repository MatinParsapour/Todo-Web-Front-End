import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SupportService } from './../../services/support/support.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-users-requests',
  templateUrl: './users-requests.component.html',
  styleUrls: ['./users-requests.component.css']
})
export class UsersRequestsComponent implements OnInit {
  requests: any;
  isLoading = false
  dataColumns = ['id','firstName','lastName','email']

  constructor(private supportService: SupportService,
    private notifier: NotificationService) { }

  ngOnInit(): void {
    this.getAllRequests()
  }

  getAllRequests(){
    this.isLoading = true
    this.supportService.getAll("request/get-all-users-requests").subscribe(
      response => {
        this.requests = response
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
        console.log(error);
        
      },
      () => {
        this.isLoading = false
      }
    )
  }

}
