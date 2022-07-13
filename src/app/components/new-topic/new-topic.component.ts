import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification/notification.service';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css'],
})
export class NewTopicComponent implements OnInit {
  request: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notifier: NotificationService,
    private dialog: MatDialog
  ) {
    this.request = fb.group({
      priority: new FormControl('', Validators.required),
      topic: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      userId: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  priorities = ['low', 'medium', 'high'];

  get priority(): any {
    return this.request.get('priority');
  }

  get topic(): any {
    return this.request.get('topic');
  }

  addNewTopic() {
    this.setUserIdInRequest();
    this.sendAddTopicRequest()
  }

  getTopicErrorMessages() {
    if (this.topic.hasError('required')) {
      return 'You need to enter topic';
    } else if (this.topic.hasError('minlength')) {
      return 3 - this.topic.value.length + ' more characters';
    }

    return null;
  }

  setUserIdInRequest() {
    const userId = localStorage.getItem('username');
    if (userId !== null) {
      this.request.get('userId')?.setValue(userId);
    }
  }

  sendAddTopicRequest() {
    this.isLoading = true
    this.userService
      .create('request/start-new-request', this.request.value)
      .subscribe(
        (response: any) => {
          this.notifier.notify(NotificationType.SUCCESS, 'The topic added');
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        },
        () => {
          this.dialog.closeAll()
          this.isLoading = false
        }
      );
  }
}
