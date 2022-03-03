import { NotificationService } from 'src/app/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { slideToDown } from './../../animations';
import { FormValidator } from './../register/FormValidator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/enum/notification-type';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations: [slideToDown]
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup
  email: any;
  isLoading: boolean = false;

  constructor(fb : FormBuilder, 
    private route: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private notifier: NotificationService,
    private router: Router) {
    this.resetPassword = fb.group({
      email: new FormControl(),
      password: new FormControl('',[Validators.required, FormValidator.passwordIsWeak]),
      reTypePassword: new FormControl('',[Validators.required])
    }, 
    {
      validator: FormValidator.passwordsDoNotMatch
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email']
    })
  }

  get password(): any{return this.resetPassword.get('password')}
  get reTypePassword(): any{return this.resetPassword.get('reTypePassword')}
  get isMinimum(){ return FormValidator.isMinimum}
  get hasNumber(){ return FormValidator.hasNumber}
  get hasLowerCase(){ return FormValidator.hasLowerCase}
  get hasUpperCase(){ return FormValidator.hasUpperCase}
  get hasSpecialCharacters(){ return FormValidator.hasSpecialCharacters}

  getPasswordErrorMessages(){
    if (this.password.hasError('required')) {return "You must enter value"}
    return "Create a stronger password"
  }

  changePassword(){
    this.resetPassword.get('email')?.setValue(this.email)
    this.isLoading = true;
    this.resetPasswordService.update("change-password", this.resetPassword.value).subscribe(
      (response:any) => {
        this.notifier.notify(NotificationType.SUCCESS, "Your password has been changed")
        this.isLoading = false;
        this.router.navigateByUrl("/login")
      }, 
      (error:HttpErrorResponse) => {
        this.notifier.notify(NotificationType.ERROR, error.message)
        this.isLoading = false
      })
  }
}
