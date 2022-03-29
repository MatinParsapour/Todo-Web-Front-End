import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SupportService } from './../../services/support/support.service';
import { Router } from '@angular/router';
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
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;
  menuTopLeftPosition = { x: '0', y: '0' };

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
        },
        () => {
          this.message.get('message')?.setValue('');
        }
      );
  }

  openMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.menuData = { item: item };
    this.matMenuTrigger.openMenu();
  }

  preventDefault(event: any) {
    event.preventDefault();
  }

  editMessage(messageId: any) {
    console.log(messageId);
  }

  deleteMessage(messageId: any) {
    this.supportService.delete('message/delete-message/' + messageId).subscribe(
      (response: any) => {
        this.getRequestData(this.request.id);
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key == 'Enter')
      this.sendMessage();
  }

  deleteRequest(requestId: any) {
    this.supportService.delete('request/delete-request/' + requestId).subscribe(
      (response: any) => {
        this.getAllRequests();
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
        console.log(error);
      },
      (this.request = null)
    );
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
}
