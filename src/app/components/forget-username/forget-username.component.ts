import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.css']
})
export class ForgetUsernameComponent implements OnInit {
  @Output('close') close = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
