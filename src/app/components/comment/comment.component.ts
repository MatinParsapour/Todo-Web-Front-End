import { NotificationService } from 'src/app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentService } from './../../services/comment/comment.service';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input('comment') comment: any;
  @Input('todo') todo: any;
  @Output('update') update = new EventEmitter();
  isEditable = false;

  constructor(
    private commentService: CommentService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {}

  deleteComment() {
    this.commentService
      .delete('/delete-comment/' + this.comment.id + '/' + this.todo.id)
      .subscribe(
        (response) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'The comment successfully deleted'
          );
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        }
      );
  }

  toggleMessageEditable() {
    this.isEditable = !this.isEditable;
  }

  @HostListener('window:keydown',['$event'])
  refuseGoToNextLine(event: KeyboardEvent){
    if (event.key === 'Enter'){
      event.preventDefault()
    }
  }

  editComment(event: any) {
    if (event.innerText !== '') {
      const formData = this.createFormData(event.innerText);
      this.commentService.update('/edit-comment', formData).subscribe(
        (response) => {
          this.update.emit();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
        }
      );
    }
  }

  createFormData(message: any): FormData {
    const formData = new FormData();
    formData.append('commentId', this.comment.id),
      formData.append('message', message);
    return formData;
  }

  isSender(): boolean{
    const userId = localStorage.getItem("username");
    return this.comment.user.id === userId 
  }
}
