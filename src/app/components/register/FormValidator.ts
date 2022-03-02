import { AbstractControl } from '@angular/forms';

export class FormValidator {
    static isMinimum: boolean = false;
    static hasLowerCase: boolean = false;
    static hasUpperCase: boolean = false;
    static hasNumber: boolean = false;
    static hasSpecialCharacters: boolean = false;

    
    static passwordsDoNotMatch(control: AbstractControl) {
    const typePassword = control.get('password');
    const reTypePassword = control.get('reTypePassword');
    if (typePassword?.value !== reTypePassword?.value) {
      return { passwordsDoNotMatch: true };
    }
    return null;
  }

  static passwordIsWeak(control: AbstractControl) {
    const password = control.value;
    FormValidator.hasMinimumLength(password)
    FormValidator.hasTwoUpperCase(password)
    FormValidator.hasTwoLowerCase(password)
    FormValidator.hasTwoNumber(password)
    FormValidator.hasTwoSpecialCharacter(password)
    if (
        FormValidator.isMinimum && 
        FormValidator.hasUpperCase && 
        FormValidator.hasLowerCase && 
        FormValidator.hasNumber && 
        FormValidator.hasSpecialCharacters) {
      return null;
    }
    return { passwordIsWeak: true };
  }

  private static hasMinimumLength(password: any) {
    let minLength = 10;
    if (password.length >= minLength) {
        FormValidator.isMinimum = true;
    } else {
        FormValidator.isMinimum = false;
    }
  }

  private static hasTwoLowerCase(password: any) {
    let lowerMinCount = 2;
    const LOWER_REGEX = /([a-z])/g;
    let lowerMatch = password.match(LOWER_REGEX) ?? [];
    if (lowerMatch.length >= lowerMinCount) {
        FormValidator.hasLowerCase = true;
    } else {
        FormValidator.hasLowerCase = false;
    }
  }

  private static hasTwoUpperCase(password: any) {
    let upperMinCount = 2;
    const UPPER_REGEX = /([A-Z])/g;
    let upperMatch = password.match(UPPER_REGEX) ?? [];
    if (upperMatch.length >= upperMinCount) {
        FormValidator.hasUpperCase = true;
    } else {
        FormValidator.hasUpperCase = false;
    }

  }

  private static hasTwoNumber(password: any) {
    let numMinCount = 2;
    const NUM_REGEX = /([\d])/g;
    let numMatch = password.match(NUM_REGEX) ?? [];
    if (numMatch.length >= numMinCount) {
        FormValidator.hasNumber = true;
    } else {
        FormValidator.hasNumber = false;
    }
  }

  private static hasTwoSpecialCharacter(password: any){
    let specialMinCount = 2;
    const SPECIAL_REGEX = /([$&+,:;=?@#|'<>.^*()%!-])/g;
    let specialMatch = password.match(SPECIAL_REGEX) ?? [];
    if (specialMatch.length >= specialMinCount) {
        FormValidator.hasSpecialCharacters = true;
    } else {
        FormValidator.hasSpecialCharacters = false;
    }
  }
}
