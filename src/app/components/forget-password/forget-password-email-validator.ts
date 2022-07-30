import { RegisterService } from 'src/app/services/register/register.service';
import {
  AbstractControl,
  AsyncValidator,
} from '@angular/forms';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordEmailValidator implements AsyncValidator {
  constructor(private registerService: RegisterService) {}

  validate = (control: AbstractControl) => {
    return this.registerService.isEmailDoplicate(control.value).pipe(
      map((response: any) => {
        if (response === false) {
          return { emailIsNotAvailable: true };
        }
        return null;
      })
    );
  };
}
