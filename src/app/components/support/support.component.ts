import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SupportService } from './../../services/support/support.service';
import { Router } from '@angular/router';
import { NewTopicComponent } from './../new-topic/new-topic.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  requests: any
  request: any
  isLoading = false

  constructor(private dialog: MatDialog, 
    private router: Router,
    private supportService: SupportService,
    private notifier: NotificationService) { }

  ngOnInit(): void {
    this.getAllRequests()
  }

  openNewTopicDialog(){
    this.dialog.open(NewTopicComponent).afterClosed().subscribe(() => this.getAllRequests())
  }

  backToMain(){
    this.router.navigateByUrl("/main")
  }

  getAllRequests(){
    this.isLoading = true
    this.supportService.getAll("request/get-user-requests/" + localStorage.getItem("username")).subscribe(
      (response: any) => {
        this.requests = response
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error)
      },
      () => {
        this.isLoading = false
      }
    )
  }

  getRequestData(id: any){
    this.isLoading = true
    this.supportService.getRequest("request/get-request/" + id).subscribe(
      (response: any) => {
        this.request = response
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error)
      },
      () => {
        this.isLoading = false
      }
    )
    
  }
}
