import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input('todo') todo: any
  @Output('update') update = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  updateComment(){
    this.update.emit()
  }

}
