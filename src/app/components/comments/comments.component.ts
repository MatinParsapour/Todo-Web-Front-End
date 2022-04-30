import { Component, Input, OnInit, Output, EventEmitter, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit, AfterViewChecked {
  @Input('todo') todo: any;
  @Output('update') update = new EventEmitter();
  @ViewChild('scroller') private scroller!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  updateComment() {
    this.update.emit();
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
}
