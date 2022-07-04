import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator/paginator';
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
  search = new FormControl();
  dataColumns: string[] = ['profile','firstName','lastName','email', 'isBlocked', 'isDeleted']
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15, 20];
  showFirstLastButtons = true;
  isLoading = false

  constructor(
    private userManagementService: UserManagementService,
    private notifier: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.isLoading = true
    this.userManagementService.getAll('/get-all/' + this.pageIndex + "/" + this.pageSize).subscribe(
      (response: any) => {
        this.users.data = response.content;
        this.length = response.totalElements
        this.isLoading = false
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
        this.isLoading = false
      }
    );
  }

  handlePageEvent(event: PageEvent){
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllUsers()
  }

  filter(){
    const filterValue = this.search.value;
    this.users.filter = filterValue.trim().toLowerCase()
  }
}
