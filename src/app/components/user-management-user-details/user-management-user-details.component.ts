import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management-user-details',
  templateUrl: './user-management-user-details.component.html',
  styleUrls: ['./user-management-user-details.component.css'],
})
export class UserManagementUserDetailsComponent implements OnInit {
  userId: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUrlParameters()
  }

  getUrlParameters() {
    this.activatedRoute.queryParams.subscribe((parameter: any) => {
      this.userId = parameter['user'];
    });
  }
}
