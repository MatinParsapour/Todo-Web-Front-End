import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
} from '@angular/forms';
import { map } from 'rxjs';
import { RegisterService } from './../../services/register/register.service';
@Injectable({
  providedIn: 'root',
})
export class EmailValidator implements AsyncValidator {
  constructor(private resgisterService: RegisterService) {}

  validate = (control: AbstractControl) => {
    return this.resgisterService.isEmailDoplicate(control.value).pipe(
      map((response: any) => {
        if (response === true) {
          return { emailIsDoplicate: true };
        }
        return null;
      })
    );
  };
}
