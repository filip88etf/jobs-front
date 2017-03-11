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
}
