import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  @Input('isStarred') isStarred!: boolean;
  @Output('click') click = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
