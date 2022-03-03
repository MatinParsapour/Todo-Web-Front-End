import { EmailValidator } from './email.validator';
import { UsernameValidator } from './username.validator';
import { CaptchaComponent } from './../captcha/captcha.component';
import { MatDialog } from '@angular/material/dialog';
import { slideToDown } from './../../animations';
import { FormValidator } from './FormValidator';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [slideToDown],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  user: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private dialog: MatDialog,
    private usernameValidator: UsernameValidator,
    private emailValidator: EmailValidator
  ) {
    this.user = formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        userName: new FormControl(
          '',
          [Validators.required, Validators.minLength(5)],
          this.usernameValidator.validate
        ),
        email: new FormControl('', [Validators.required, Validators.email], this.emailValidator.validate),
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

  ngOnInit(): void {}

  showResult() {
    console.log(this.user.value);
  }

  setIsLoadingTrue() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.showResult();
      this.dialog.open(CaptchaComponent, {
        data: {
          url: '/login',
          ok:
            this.firstName.value +
            ' ' +
            this.lastName.value +
            ' registerd successfully',
          fail: 'The captcha is invalid',
        },
      });
    }, 5000);
  }

  getFirstNameErrorMessages() {
    if (this.firstName.hasError('required')) {
      return 'First name is manadatory';
    }
    return null;
  }

  getLastNameErrorMessages() {
    if (this.lastName.hasError('required')) {
      return 'Last name is manadatory';
    }
    return null;
  }

  getEmailErrorMessages() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.email.hasError('emailIsDoplicate')) {
      return 'The email is taken';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getUsernameErrorMessages() {
    if (this.username.hasError('required')) {
      return 'Username is mandatory';
    }
    if (this.username.hasError('usernameisDoplicate')) {
      return this.username.value + " isn't available"
    }
    return 5 - this.username.value.length + ' more charater(s)';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password is mandatory';
    }
    if (this.password.hasError('passwordIsWeak')) {
      return 'Create a stronger password';
    }
    return 10 - this.password?.value.length + ' more character(s)';
  }

  get firstName(): any {
    return this.user.get('firstName');
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

  get isMinimum() {return FormValidator.isMinimum}
  get hasLowerCase(){return FormValidator.hasLowerCase}
  get hasUpperCase(){return FormValidator.hasUpperCase}
  get hasNumber(){return FormValidator.hasNumber}
  get hasSpecialCharacters(){return FormValidator.hasSpecialCharacters}
}
