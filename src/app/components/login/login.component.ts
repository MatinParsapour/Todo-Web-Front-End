import { CaptchaComponent } from './../captcha/captcha.component';
import { ForgetPasswordComponent } from './../forget-password/forget-password.component';
import { slideToDown } from './../../animations';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToDown],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  user: FormGroup;

  constructor(fb: FormBuilder, private dialog: MatDialog) {
    this.user = fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {}

  showResult() {
    this.isLoading = true;
    setTimeout(() => 
    {
      this.isLoading = false;
      this.dialog.open(CaptchaComponent, {data: {url: "/register", ok: "You are logged in", fail: "Captcha is invalid"}})
    }, 5000)
    
  }

  getUsernameErrorMessages() {
    if (this.username.hasError('minlength')) {
      return 5 - this.username.value.length + " more character(s)";
    }
    if (this.username.hasError('required')) {
      return 'Username is required';
    }
    return null;
  }

  getPasswordErrorMessages() {
    if (this.password.hasError('minlength')) {
      return 8 - this.password.value.length + ' more charater(s)';
    }
    if (this.password.hasError('required')) {
      return 'password is required';
    }
    return null;
  }

  openForgetPassword() {
    this.dialog.open(ForgetPasswordComponent);
  }

  get username(): any {
    return this.user.get('username');
  }
  get password(): any {
    return this.user.get('password');
  }
}
