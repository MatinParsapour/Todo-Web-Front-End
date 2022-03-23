import { MatTableDataSource } from '@angular/material/table';
import { UserManagementService } from './../../services/user-management/user-management.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users = new MatTableDataSource();
  columns: string[] = ['firstName','lastName','email']

  constructor(
    private userManagementService: UserManagementService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userManagementService.getAll('/get-all').subscribe(
      (response: any) => {
        this.users.data = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }
}
