import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-text-area',
  templateUrl: 'text-area.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})

export class TextAreaComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() required: boolean;
  touched: boolean = false;
  valid: boolean = true;
  model: any;
  private propagateChange = (_: any) => {};

  ngOnInit() {
  }

  valueChanged() {
    this.propagateChange(this.model);
  }

  validate(control: FormControl) {
    if (this.touched && this.required) {
      this.valid = control.value && control.value.length;
    }
    this.touched = true;
  }

  public writeValue(obj: any) {
    this.model = obj;
    this.valid = true;
    this.touched = false;
  }

  public registerOnChange(fn: any) {
      this.propagateChange = fn;
  }

  public registerOnTouched() { }
}
