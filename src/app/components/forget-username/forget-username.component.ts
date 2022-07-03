import { NotificationService } from './../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user/user.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.css']
})
export class ForgetUsernameComponent implements OnInit {
  @Output('close') close = new EventEmitter()
  isLoading = false;
  isEnterEmailOrPhoneEditable = true;
  isCheckCodeEditable = false;
  isUsernameInputEditable = false;
  emailOrPhone = new FormControl('',[Validators.required, Validators.minLength(3)])

  constructor(private userService: UserService,
              private notifier: NotificationService) { }

  ngOnInit(): void {
  }

  sendCode(){
    const formData = new FormData();
    formData.append("emailOrPhoneNumber",this.emailOrPhone.value); 
    this.isLoading = true;
    this.userService.create("/user/forget-username",formData).subscribe(
      (response: any) => {
        this.isEnterEmailOrPhoneEditable = false;
        this.isCheckCodeEditable = true;
        this.notifier.notify(NotificationType.SUCCESS, "Code has sent to " + this.emailOrPhone.value)
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error)
        console.log(error);
        
      },
      () => {
        this.isLoading = false;
      }
    )
  }

}
