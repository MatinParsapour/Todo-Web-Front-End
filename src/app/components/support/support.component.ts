import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SupportService } from './../../services/support/support.service';
import { Router } from '@angular/router';
import { NewTopicComponent } from './../new-topic/new-topic.component';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit, AfterViewChecked {
  requests: any;
  request: any;
  isLoading = false;
  message: FormGroup;
  @ViewChild('scroller') private scroller!: ElementRef;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private supportService: SupportService,
    private notifier: NotificationService,
    private fb: FormBuilder
  ) {
    this.message = fb.group({
      message: new FormControl('', [Validators.required]),
      userId: new FormControl(''),
    });
  }
  scrollToBottom(): void {
    try {
      this.scroller.nativeElement.scrollTop =
        this.scroller.nativeElement.scrollHeight;
    } catch (err) {}
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.getAllRequests();
    this.scrollToBottom();
  }

  openNewTopicDialog() {
    this.dialog
      .open(NewTopicComponent)
      .afterClosed()
      .subscribe(() => this.getAllRequests());
  }

  backToMain() {
    this.router.navigateByUrl('/main');
  }

  getAllRequests() {
    this.isLoading = true;
    this.supportService
      .getAll('request/get-user-requests/' + localStorage.getItem('username'))
      .subscribe(
        (response: any) => {
          this.requests = response;
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.error);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  getRequestData(id: any) {
    this.isLoading = true;
    this.supportService.getRequest('request/get-request/' + id).subscribe(
      (response: any) => {
        this.request = response;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  get messaged(): any {
    return this.message.get('message');
  }

  isSender(userId: any): boolean {
    return userId === localStorage.getItem('username');
  }

  sendMessage() {
    this.message.get('userId')?.setValue(localStorage.getItem('username'));
    this.supportService
      .create('message/send-message/' + this.request.id, this.message.value)
      .subscribe(
        (response) => {
          this.getRequestData(this.request.id);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.error);
        }
      );
    this.message.get('message')?.setValue('');
  }

  preventDefault(event: any) {
    event.preventDefault();
  }

  openMenu(){
    alert("You right clicked")
  }
}
