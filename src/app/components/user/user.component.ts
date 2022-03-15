import { AggreementComponent } from './../aggreement/aggreement.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  fullScreen = false
  now = new Date()

  constructor(
    private userService: UserService,
    private notifier: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.userService.getUser(localStorage.getItem('username')).subscribe(
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

  deleteProfile(){
    this.userService.delete("/user/delete-profile-image/" + localStorage.getItem("username")).subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, "Your profile successfully deleted")
        this.getUser()
      }, 
      (error: HttpErrorResponse) => {
        console.log(error);
        
      }
    )
  }

  deleteAccount(){
    this.userService.delete("/user/delete-account/" + localStorage.getItem("username")).subscribe(
      (response: any) => {
        this.notifier.notify(NotificationType.SUCCESS, "Your account deleted successfully")
        this.dialog.closeAll()
        localStorage.clear()
        this.router.navigateByUrl("/login")
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, "Something went wrong your account didn't delete")
        console.log(error);
        
      }
    )
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/login")
    this.dialog.closeAll()
  }

  openDeleteAccountAggreement(){
    this.dialog.open(AggreementComponent, {data: {title: "Are you sure you want to delete your account"}}).afterClosed().subscribe((response:any) => {
      if (response === 'Yes') {
        this.deleteAccount()
      }
    })
  }

  openFullScreen(){
    this.fullScreen = true
  }

  closeFullScreen(){
    this.fullScreen = false
  }
}
