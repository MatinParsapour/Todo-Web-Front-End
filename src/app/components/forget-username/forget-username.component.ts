import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.css']
})
export class ForgetUsernameComponent implements OnInit {
  @Output('close') close = new EventEmitter()
  isEnterEmailOrPhoneEditable = true;
  isCheckCodeEditable = false;
  isUsernameInputEditable = false;
  emailOrPhone = new FormControl('',[Validators.required, Validators.minLength(3)])

  constructor() { }

  ngOnInit(): void {
  }

}
