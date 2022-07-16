import { NotificationService } from 'src/app/services/notification/notification.service';
import { CommentService } from './../../services/comment/comment.service';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.css'],
})
export class CommentInputComponent implements OnInit {
  comment: UntypedFormGroup;
  isEmojiPickerVisible = false;
  @Input('todo') todo: any;
  @Output('update') update = new EventEmitter();

  constructor(
    private fb: UntypedFormBuilder,
    private commentService: CommentService,
    private notifier: NotificationService
  ) {
    this.comment = fb.group({
      userId: new UntypedFormControl('', Validators.required),
      message: new UntypedFormControl('', Validators.required),
      todoId: new UntypedFormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  sendComment() {
    this.initializeComment();
    this.commentService.create('/comment', this.comment.value).subscribe(
      (response) => {
        this.update.emit();
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(
          NotificationType.ERROR,
          error.error.type + ': ' + error.error.message
        );
      },
      () => {
        this.comment.get('message')?.setValue('');
      }
    );
  }

  get message(): any {
    return this.comment.get('message');
  }

  addEmoji(event: any) {
    this.comment
      .get('message')
      ?.setValue(this.comment.get('message')?.value + event.emoji.native);
  }

  initializeComment() {
    this.comment.get('userId')?.setValue(localStorage.getItem('username'));
    this.comment.get('todoId')?.setValue(this.todo.id);
  }
}
