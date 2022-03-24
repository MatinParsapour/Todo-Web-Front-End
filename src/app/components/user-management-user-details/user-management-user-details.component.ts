import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-user-management-user-details',
  templateUrl: './user-management-user-details.component.html',
  styleUrls: ['./user-management-user-details.component.css'],
})
export class UserManagementUserDetailsComponent implements OnInit {
  userId: any;
  user!: User;
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private notifier: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUrlParameters();
    this.getUser();
  }

  getUrlParameters() {
    this.activatedRoute.queryParams.subscribe((parameter: any) => {
      this.userId = parameter['user'];
    });
  }

  getUser() {
    this.isLoading = true;
    this.userService.getUser(this.userId).subscribe(
      (response: any) => {
        this.user = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;

        this.notifier.notify(
          NotificationType.ERROR,
          'Something went wrong by getting data, try again later'
        );
      }
    );
  }

  backToMain() {
    this.router.navigateByUrl('/user-management');
  }
}
