import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-input-text',
  templateUrl: 'input-text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})

export class InputTextComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() minLength: number = 0;
  @Input() placeholder: string = '';
  private propagateChange = (_: any) => {};
  touched: boolean = false;
  valid: boolean = true;
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
    this.valid = !(this.minLengthError || this.requiredError);
    this.touched = true;
  }

  clearValidation() {
    this.valid = true;
    this.minLengthError = this.requiredError = false;
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
