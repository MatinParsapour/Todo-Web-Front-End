import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SupportService } from './../../services/support/support.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NewTopicComponent } from './../new-topic/new-topic.component';
import { MatDialog } from '@angular/material/dialog';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';
import { MatMenuTrigger } from '@angular/material/menu';
import { Location } from '@angular/common';

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
  userId: any;
  @ViewChild('scroller') private scroller!: ElementRef;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private supportService: SupportService,
    private notifier: NotificationService,
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.message = fb.group({
      message: new FormControl('', [Validators.required]),
      userId: new FormControl(''),
    });
    this.getUrlParameters()
  }

  getUrlParameters() {
    this.activatedRoute.queryParams.subscribe((parameter: any) => {
      this.userId = parameter['userId'];
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
    this.location.back()
  }

  getAllRequests() {
    this.isLoading = true;
    this.supportService
      .getAll('request/get-user-requests/' + this.userId)
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
        },
        () => {
          this.message.get('message')?.setValue('');
        }
      );
  }

  preventDefault(event: any) {
    event.preventDefault();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key == 'Enter')
      this.sendMessage();
  }

  updateRequest() {
    this.supportService
      .update('request/update-request', this.request)
      .subscribe(
        (response: any) => {
          this.getRequestData(this.request.id);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(NotificationType.ERROR, error.error);
        }
      );
  }

  requestSolved() {
    this.request.isSolved = !this.request.isSolved;
    this.updateRequest();
  }

  requestFinished() {
    this.request.isFinished = !this.request.isFinished;
    this.updateRequest();
  }

  sendPicture(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('picture', file);
    formData.append('requestId', this.request.id);
    const userId = localStorage.getItem("username")
    if (userId){
      formData.append("userId", userId)
    }
    this.supportService.create("message/send-picture",formData).subscribe(
      response => {
        this.updateRequest()
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
}
