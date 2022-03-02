import { ActivatedRoute } from '@angular/router';
import { slideToDown } from './../../animations';
import { FormValidator } from './../register/FormValidator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations: [slideToDown]
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup
  email: any;

  constructor(fb : FormBuilder, private route: ActivatedRoute) {
    this.resetPassword = fb.group({
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
    console.log(this.email, this.password.value, this.reTypePassword.value);
    
  }
}
