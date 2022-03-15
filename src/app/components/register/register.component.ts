import { NotificationService } from './../../services/notification/notification.service';
import { Router } from '@angular/router';
import { RegisterService } from './../../services/register/register.service';
import { EmailValidator } from './email.validator';
import { UsernameValidator } from './username.validator';
import { MatDialog } from '@angular/material/dialog';
import { slideToDown } from './../../animations';
import { FormValidator } from './FormValidator';
import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';

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
  socialUser!: SocialUser;
  isLoggedin!: boolean;
  constructor(
    formBuilder: FormBuilder,
    private dialog: MatDialog,
    private usernameValidator: UsernameValidator,
    private emailValidator: EmailValidator,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private registerService: RegisterService,
    private notifier: NotificationService
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
        recaptcha: ['', Validators.required],
        email: new FormControl(
          '',
          [Validators.required, Validators.email],
          this.emailValidator.validate
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
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  registerUser() {
    this.isLoading = true;
    console.log(this.user.value);

    this.registerService.create('add-user', this.user.value).subscribe(
      () => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'Your account registered successfully'
        );
        this.router.navigateByUrl('/login');
        this.dialog.closeAll();
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.message);
        this.isLoading = false;
      }
    );
  }

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response: any) => {
        this.user.get('firstName')?.setValue(this.socialUser.firstName);
        this.user.get('lastName')?.setValue(this.socialUser.lastName);
        this.user.get('userName')?.setValue(this.socialUser.email);
        this.user.get('email')?.setValue(this.socialUser.email);
        this.user.get('password')?.setValue('MMmm11!!11');
        
        // this.registerUser();
      });
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this.user.get('firstName')?.setValue(this.socialUser.firstName);
      this.user.get('lastName')?.setValue(this.socialUser.lastName);
      this.user.get('userName')?.setValue(this.socialUser.email);
      this.user.get('email')?.setValue(this.socialUser.email);
      this.user.get('password')?.setValue('MMmm11!!11');      
    });
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
      return this.username.value + " isn't available";
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
