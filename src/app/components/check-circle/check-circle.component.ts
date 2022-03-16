import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-circle',
  templateUrl: './check-circle.component.html',
  styleUrls: ['./check-circle.component.css']
})
export class CheckCircleComponent implements OnInit {

  @Input('status') status!: any;
  @Output('click') click = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
