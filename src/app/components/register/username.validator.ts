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
export class UsernameValidator implements AsyncValidator {
  constructor(private resgisterService: RegisterService) {}
  validate = (control: AbstractControl) => {
    return this.resgisterService.isUsernameDoplicate(control.value).pipe(
      map((response: any) => {
        if (response === true) {
          return { usernameisDoplicate: true };
        }
        return null;
      })
    );
  };
}
