import { NotificationService } from './../../services/notification/notification.service';
import { SupportService } from './../../services/support/support.service';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input('message') message: any;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;
  @Output('update') update = new EventEmitter()
  menuTopLeftPosition = { x: '0', y: '0' };
  isEditable = false

  constructor(private supportService: SupportService,
    private notifier: NotificationService) {}

  ngOnInit(): void {}

  isSender(userId: any): boolean {
    return userId === localStorage.getItem('username');
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

  makeMessageContentEditable(messageId: any) {
    this.isEditable = !this.isEditable
  }

  deleteMessage(messageId: any) {
    this.supportService.delete('message/delete-message/' + messageId).subscribe(
      (response: any) => {
        this.update.next('')
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error);
      }
    );
  }
}
