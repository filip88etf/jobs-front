import { AbstractControl } from '@angular/forms';

export class GlobalValidators {
  static emailValidator (control: AbstractControl) {
    let value = control.value,
    emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (value && !emailRegex.test(value)) {
      return { email: true };
    }
    return null;
  }

  static passwordMatcher(firstInputName: string, secondInputName: string) {
    return (control: AbstractControl) => {
      let password = control.get(firstInputName),
          confirmPassword = control.get(secondInputName);

      if (password.pristine || confirmPassword.pristine || password.value === confirmPassword.value) {
        return null;
      }
      return {match: true};
    };
  }
}
