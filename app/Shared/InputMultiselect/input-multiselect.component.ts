import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { Option } from '../../global-types';

@Component({
  moduleId: module.id,
  selector: 'app-input-multiselect',
  templateUrl: 'input-multiselect.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMultiselectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputMultiselectComponent),
      multi: true
    }
  ]
})

export class InputMultiselectComponent implements ControlValueAccessor, OnInit {
  @Input() options: Option[];
  @Input() label: string;
  @Input() required: boolean;
  // the method set in registerOnChange, it is just
  // a placeholder for a method that takes one parameter,
  // we use it to emit changes back to the form
  private propagateChange = (_: any) => {};
  selected: Option[];
  touched: boolean = false;
  valid: boolean = true;

  ngOnInit() {}

  closed() {
    this.propagateChange(this.selected);
  }

  validate(control: FormControl) {
    if (this.touched && this.required) {
      this.valid = control.value && control.value.length;
    }
    this.touched = true;
  }

  // this is the initial value set to the component
  public writeValue(obj: any) {
    this.selected = obj;
    this.valid = true;
    this.touched = false;
  }
  // registers 'fn' that will be fired when changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
      this.propagateChange = fn;
  }
  // not used, used for touch input
  public registerOnTouched() { }
}
