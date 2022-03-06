import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-aggreement',
  templateUrl: './aggreement.component.html',
  styleUrls: ['./aggreement.component.css']
})
export class AggreementComponent implements OnInit {

  title: any

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
   }

  ngOnInit(): void {
  }

}
