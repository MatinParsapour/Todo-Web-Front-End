import { Injectable } from '@angular/core';
import { RegisterService } from './../../services/register/register.service';
import {
  AbstractControl,
  AsyncValidator,
} from '@angular/forms';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsEmailExists implements AsyncValidator {
  constructor(private registerService: RegisterService) {}

  validate = (control: AbstractControl) => {
    return this.registerService.isEmailDoplicate(control.value).pipe(
      map((response: any) => {
        if (response === true) {
          return { emailExists: true };
        }
        return null;
      })
    );
  };
}
