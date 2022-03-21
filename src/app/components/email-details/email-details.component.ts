import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailDetailsService } from './../../services/emai-details/email-details.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.css'],
})
export class EmailDetailsComponent implements OnInit {
  emailId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private emailDetailsService: EmailDetailsService
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
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
