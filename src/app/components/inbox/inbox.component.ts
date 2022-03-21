import { HttpErrorResponse } from '@angular/common/http';
import { InboxService } from './../../services/email-service/inbox/inbox.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  dataSource: any;

  constructor(private inboxService: InboxService) {}

  ngOnInit(): void {
    this.inboxService
      .getAllInbox('inbox/' + localStorage.getItem('username'))
      .subscribe(
        (response: any) => {
          this.dataSource = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  displayedColumns: string[] = ['from', 'to', 'date', 'message'];

  displayData(element: any){
    console.log(element);
    
  }
}