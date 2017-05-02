import { FormGroup } from '@angular/forms';

export class Helper {
  static validateForm(form: FormGroup): boolean {
    let isValid = true;

    for (let control in form.controls) {
      form.controls[control].updateValueAndValidity();
      isValid =  isValid && form.controls[control].valid;
    }

    return isValid;
  }

  static mapFormToEntity(form: FormGroup, entity: Object): void {
    for (let control in form.controls) {
      entity[control] = form.controls[control].value;
    }
  }

  static submitForm(form: FormGroup, entity: Object): void {
    if (Helper.validateForm(form)) {
      Helper.mapFormToEntity(form, entity);
    }
  }
}
