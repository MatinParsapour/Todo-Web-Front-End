import { Router } from '@angular/router';
import { NotificationService } from './../../services/notification/notification.service';
import { LoginService } from './../../services/login/login.service';
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
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToDown],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  user: FormGroup;
  siteKey: string = '6Lc7ct0eAAAAAD0Jqa_1Eih2MiucxWAGsDpRpOVn';
  socialUser!: SocialUser;
  isLoggedin!: boolean;

  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    private loginService: LoginService,
    private notifier: NotificationService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.user = fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      recaptcha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.redirectToMainIfUserSignedIn()
    this.authenticateUserForSignIn()
  }

  authenticateUserForSignIn() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  redirectToMainIfUserSignedIn(){
    const username = localStorage.getItem("username")
    if (username !== null) {
      this.router.navigateByUrl('/main')
    }
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.initializeUser();
      this.updateLocalStorage();
      this.signInUser();
    });
  }

  loginWithFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(() => {
        this.initializeUser();
        this.updateLocalStorage();
        this.signInUser();
      });
  }

  signInUser() {
    this.loginService.create('/sign-in', this.user.value).subscribe(
      (response: any) => {
        this.notifier.notify(
          NotificationType.SUCCESS,
          'You logged in successfully'
        );
        this.router.navigateByUrl('/main');
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, 'Something went wrong');
        console.log(error);
      }
    );
  }

  initializeUser() {
    this.user.get('firstName')?.setValue(this.socialUser.firstName);
    this.user.get('lastName')?.setValue(this.socialUser.lastName);
    this.user.get('userName')?.setValue(this.socialUser.email);
    this.user.get('email')?.setValue(this.socialUser.email);
    this.user.get('password')?.setValue('MMmm11!!11');
  }

  updateLocalStorage() {
    localStorage.setItem('username', this.socialUser.email);
    localStorage.setItem('firstName', this.socialUser.firstName);
    localStorage.setItem('lastName', this.socialUser.lastName);
  }

  login() {
    this.isLoading = true;
    this.loginService.create('/log-in', this.user.value).subscribe(
      (response: any) => {
        if (response !== null) {
          this.notifier.notify(NotificationType.SUCCESS, 'You are logged in');
          this.updateLocalStorage();
          this.router.navigateByUrl('/main');
        } else {
          this.notifier.notify(
            NotificationType.ERROR,
            'Username or password is wrong'
          );
        }
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.message);
        this.isLoading = false;
      }
    );
  }

  getUsernameErrorMessages() {
    if (this.username.hasError('minlength')) {
      return 5 - this.username.value.length + ' more character(s)';
    }
    if (this.username.hasError('required')) {
      return 'Username is required';
    }
    return null;
  }

  getPasswordErrorMessages() {
    if (this.password.hasError('minlength')) {
      return 10 - this.password.value.length + ' more charater(s)';
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
    return this.user.get('userName');
  }
  get password(): any {
    return this.user.get('password');
  }
  get recaptcha(): any {
    return this.user.get('recaptcha');
  }
}
