import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { RegisterService } from './../../services/register/register.service';
@Injectable({
  providedIn: 'root',
})
export class UsernameValidator implements AsyncValidator {
  constructor(private resgisterService: RegisterService) {}
  validate = (control: AbstractControl) => {
    return this.resgisterService.isUsernameDoplicate(control.value).pipe(
      map((response: any) => {
        if (response === true) {
            return {usernameisDoplicate: true}
        }
        return null;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    ));
  };
}
