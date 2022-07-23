import { NotificationService } from './../../../services/notification/notification.service';
import { SettingsService } from './../../../services/settings/settings.service';
import { UserService } from './../../../services/user/user.service';
import { User } from './../../../classes/user';
import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  username!: string;
  user!: User;
  profileImage: any;
  uploaded!: number;
  bioLength = 300;

  constructor(
    private userService: UserService,
    private settingsService: SettingsService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
    this.username = this.settingsService.getUsername()
  changeProfileImage(event: any) {
    this.profileImage = event.target.files[0];
    const formData = new FormData();
    formData.append('userId', this.username);
    formData.append('profileImage', this.profileImage);
    this.userService.updateProfileImage(formData).subscribe(
      (event: HttpEvent<any>) => {
        this.reportUploadProgress(event);
        this.getUser();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getUser() {
    this.settingsService.getUser(this.username, 'personal-info').subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
        console.log(error);
        
      }
    );
  }

}
