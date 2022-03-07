import { AbstractControl } from '@angular/forms';
import PhoneNumber from 'awesome-phonenumber';
export class PhoneValidator {
  static phoneValidator(control: AbstractControl) {
    const country = control.get('country');
    const num = control.get('number');
    if (
      num?.value &&
      country?.value &&
      !new PhoneNumber(num.value, country.value).isValid()
    ) {
      return { invalidPhone: true };
    } else {
      return null;
    }
  }
}
