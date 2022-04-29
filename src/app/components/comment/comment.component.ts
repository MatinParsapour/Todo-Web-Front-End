import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentService } from './../../services/comment/comment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input('comment') comment: any;
  @Input('todo') todo: any;

  constructor(private commentService: CommentService,
              private notifier: NotificationService) {}

  ngOnInit(): void {}

  deleteComment() {
    this.commentService.delete('/delete-comment/' + this.comment.id + "/" + this.todo.id).subscribe(
      response => {
        this.notifier.notify(NotificationType.SUCCESS, "The comment successfully deleted")
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.error)
        console.log(error);
        
      }
    );
  }
}
