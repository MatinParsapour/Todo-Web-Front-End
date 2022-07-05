import { UsernameValidator } from './username.validator';
import { NotificationService } from './../../services/notification/notification.service';
import { Router } from '@angular/router';
import { RegisterService } from './../../services/register/register.service';
import { EmailValidator } from './email.validator';
import { slideToDown } from './../../animations';
import { FormValidator } from './FormValidator';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [slideToDown],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  user: FormGroup;
  siteKey: string = '6Lc7ct0eAAAAAD0Jqa_1Eih2MiucxWAGsDpRpOVn';
  onSignIn = 'onSignIn';
  isSecondForm = false;

  constructor(
    formBuilder: FormBuilder,
    private emailValidator: EmailValidator,
    private usernameValidator: UsernameValidator,
    private router: Router,
    private registerService: RegisterService,
    private notifier: NotificationService
  ) {
    this.user = formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required]),
        provider: new FormControl('EMAIL', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        recaptcha: ['', Validators.required],
        email: new FormControl(
          '',
          [Validators.required, Validators.email],
          this.emailValidator.validate
        ),
        userName: new FormControl(
          '',
          [Validators.required],
          this.usernameValidator.validate
        ),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          FormValidator.passwordIsWeak,
        ]),
        reTypePassword: new FormControl('', [Validators.required]),
      },
      {
        validator: FormValidator.passwordsDoNotMatch,
      }
    );
  }

  ngOnInit(): void {
    this.redirectToMainIfUserSignedIn();
  }

  redirectToMainIfUserSignedIn() {
    const username = localStorage.getItem('username');
    if (username !== null) {
      this.router.navigateByUrl('/main');
    }
  }

  nextForm() {
    var fpf = document.getElementById('fpf');
    var spf = document.getElementById('spf');

    if (fpf != null && spf != null) {
      spf.style.left = '50px';
      fpf.style.left = '-450px';
    }
    this.isSecondForm = true;
  }

  registerUser() {
      this.isLoading = true;
      this.registerService.create('add-user', this.user.value).subscribe(
        (response: any) => {
          this.notifier.notify(
            NotificationType.SUCCESS,
            'A verificaiton email sent to your email'
          );
          this.router.navigateByUrl('/login');
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(
            NotificationType.ERROR,
            error.error.type + ': ' + error.error.message
          );
          this.isLoading = false;
        }
      );
  }

  get firstName(): any {
    return this.user.get('firstName');
  }
  get recaptcha(): any {
    return this.user.get('recaptcha');
  }
  get lastName(): any {
    return this.user.get('lastName');
  }
  get password(): any {
    return this.user.get('password');
  }
  get reTypePassword(): any {
    return this.user.get('reTypePassword');
  }
  get email(): any {
    return this.user.get('email');
  }
  get username(): any {
    return this.user.get('userName');
  }

  get isMinimum() {
    return FormValidator.isMinimum;
  }
  get hasLowerCase() {
    return FormValidator.hasLowerCase;
  }
  get hasUpperCase() {
    return FormValidator.hasUpperCase;
  }
  get hasNumber() {
    return FormValidator.hasNumber;
  }
  get hasSpecialCharacters() {
    return FormValidator.hasSpecialCharacters;
  }
}
