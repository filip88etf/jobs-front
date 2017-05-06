import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-input-password',
  templateUrl: 'input-password.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    }
  ]
})

export class InputPasswordComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() minLength: number = 0;
  private propagateChange = (_: any) => {};
  valid: boolean = true;
  touched: boolean = false;
  model: any;
  minLengthError: boolean = false;
  requiredError: boolean = false;

  ngOnInit() {
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
    if (this.touched) {
      this.valid = !(this.minLengthError || this.requiredError);
    }

    setTimeout(function checkFormErrors() {
      this.valid = this.valid && !(control.errors && control.errors['match']);
    }.bind(this), 250);
    this.touched = true;
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
