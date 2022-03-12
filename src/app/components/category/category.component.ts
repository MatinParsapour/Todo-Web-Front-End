import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input('name') name = "";
  @Output('click') click = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

}
