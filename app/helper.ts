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

  static getControlValue(value: any): any {
    if (typeof value === 'object' && value.day) {
      let month = value.month < 10 ? '0' + value.month : value.month.toString();
      let day = value.day < 10 ? '0' + value.day : value.day.toString();

      value = value.year + '-' + month + '-' + day + ' 00:00:00';
    }

    return value;
  }

  static mapFormToEntity(form: FormGroup, entity: Object): void {
    for (let property in form.controls) {
      let control = form.controls[property];

      if (control['controls']) {
        Helper.mapFormToEntity(<FormGroup>control, entity);
      } else {
        entity[property] = Helper.getControlValue(control.value);
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

  static subtractYear(years: number = 18) {
    let date = new Date(),
        year = date.getFullYear() - years;

    date['setYear'](year);

    return date;
  }

  static datePickerFormat(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDay()
    };
  }
}
