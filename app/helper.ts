import { FormGroup, FormControl } from '@angular/forms';

export class Helper {
  static validateForm(form: FormGroup): boolean {
    let isValid = true;

    for (let property in form.controls) {
      let control = form.controls[property];

      control.updateValueAndValidity();
      if (control['controls']) {
        let innerValid: boolean = Helper.validateForm(<FormGroup>control);
        isValid =  isValid && innerValid;
      } else {
        isValid =  isValid && control.valid;
      }
    }

    return isValid;
  }

  static mapFormToEntity(form: FormGroup, entity: Object): void {
    for (let property in form.controls) {
      let control = form.controls[property];

      if (control['controls']) {
        Helper.mapFormToEntity(<FormGroup>control, entity);
      } else {
        entity[property] = control.value;
      }
    }
  }

  static submitForm(form: FormGroup, entity: Object): boolean {
    let isValid = Helper.validateForm(form);

    if (isValid) {
      Helper.mapFormToEntity(form, entity);
    }

    return isValid;
  }

  static updateForm(form: FormGroup, entiti: Object): void {
    for (let control in form.controls) {
      if (entiti[control]) {
        form.controls[control].patchValue(entiti[control]);
      }
    }
  }

}
