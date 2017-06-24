import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { UserService } from '../../User/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-input-unique',
  templateUrl: 'input-unique.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUniqueComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputUniqueComponent),
      multi: true
    }
  ]
})

export class InputUniqueComponent implements ControlValueAccessor {
  @Input() ignoreValue: string;
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() minLength: number = 0;
  @Input() placeholder: string = '';
  @Input() field: string;
  private propagateChange = (_: any) => {};
  touched: boolean = false;
  valid: boolean = true;
  model: any;
  minLengthError: boolean = false;
  requiredError: boolean = false;
  uniqueError: boolean = false;

  constructor(private userService: UserService) {
  }

  valueChanged() {
    this.propagateChange(this.model);
  }

  validate(control: FormControl) {
    let value = control.value;

    if (this.touched && this.required) {
      this.requiredError = !(value && value.length);
    } else {
      this.requiredError = false;
    }
    if (this.touched && this.minLength > 0 && value && !this.requiredError) {
      this.minLengthError = value.length < this.minLength;
    } else {
      this.minLengthError = false;
    }
    this.valid = !(this.minLengthError || this.requiredError);

    if (this.field && this.valid && this.touched && this.ignoreValue !== this.model) {
      this.userService.doesExist(this.model, this.field).subscribe(
        (exist) => {
          this.uniqueError = exist;
          this.valid = this.valid && !this.uniqueError;
        }
      );
    }
    this.touched = true;
  }

  clearValidation() {
    this.valid = true;
    this.uniqueError = this.minLengthError = this.requiredError = false;
  }

  public writeValue(obj: any) {
    this.model = obj;
    this.valid = true;
    this.minLengthError = false;
    this.requiredError = false;
    this.touched = false;
  }

  public registerOnChange(fn: any) {
      this.propagateChange = fn;
  }

  public registerOnTouched() { }
}
