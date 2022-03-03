import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from 'src/app/services/register/register.service';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordEmailValidator implements AsyncValidator {
  constructor(private registerService: RegisterService) {}

  validate = (control: AbstractControl) => {
    return this.registerService.isEmailDoplicate(control.value).pipe(
      map(
        (response: any) => {
          console.log(response);
          if (response === false) {
            return { emailIsNotAvailable: true };
          }
          return null;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  };
}