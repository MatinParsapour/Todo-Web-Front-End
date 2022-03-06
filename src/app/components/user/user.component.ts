import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationType } from 'src/app/enum/notification-type';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user!: User;
  isLoading: boolean = false;
  public profileImage: any;

  constructor(
    private userService: UserService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(localStorage.getItem('username')).subscribe(
      (response: any) => {        
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        this.notifier.notify(
          NotificationType.ERROR,
          'Something went wrong by getting data, try again later'
        );
      }
    );
  }
  changeProfileImage(event: any) {
    this.profileImage = event.target.files[0];
    const formData = new FormData();
    const username = localStorage.getItem('username');
    if (username != null) {
      formData.append('username', username);
    }
    formData.append('profileImage', this.profileImage);
    this.userService.update('/user/update-profile-image', formData).subscribe(
      (response: any) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'You profile successfully changed'
        );
        this.getUser();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  updateUser() {
    let date = new Date(this.user.birthDay);
    let pipe: DatePipe = new DatePipe('en-US');
    let birthday = pipe.transform(date, 'yyyy-MM-dd');

    this.user.birthDay = birthday;
    this.isLoading = true;
    this.userService.update('/user/update-user', this.user).subscribe(
      (response: any) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'You information updated'
        );
        this.user = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 406) {
          this.notifier.notify(
            NotificationType.ERROR,
            'The username you entered already exists'
          );
        } else {
          this.notifier.notify(NotificationType.ERROR, 'Something went wrong');
        }
        this.isLoading = false;
      }
    );
  }

  selectProfile(){
    this.clickButton('select-picture');
  }

  clickButton(tagId: any){
    document.getElementById(tagId)?.click()
  }
}
