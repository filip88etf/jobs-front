import { OnInit, Component, Input, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Helper } from '../../helper';

@Component({
  moduleId: module.id,
  selector: 'app-input-calendar',
  templateUrl: 'input-calendar.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCalendarComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputCalendarComponent),
      multi: true
    }
  ]
})

export class InputCalendarComponent implements ControlValueAccessor, OnInit {
  touched: boolean = false;
  valid: boolean = true;
  model: Object;
  picker: Object;
  @Input() label: string;
  @Input() settings: Object;
  @Input() required: boolean;
  private propagateChange = (_: any) => {};

  ngOnInit() {
    this.settings = this.settings || {};
  }

  ngOnChanges(model: any) {
    console.log(this.model);
  }

  valueChanged() {
    this.propagateChange(this.model);
  }

  validate(control: FormControl) {
    if (this.touched && this.required) {
      this.valid = !!(this.model && this.model['day']);
    }
    this.touched = true;
  }

  toggle(picker: any) {
    picker.toggle();
    if (picker.isOpen() && !this.picker) {
      this.picker = picker;
      picker.registerOnChange(function(){
        this.model = this.picker._model;
        this.propagateChange(this.picker._model);
      }.bind(this));
    }
  }

  clearValidation() {
    this.valid = true;
  }
  // this is the initial value set to the component
  public writeValue(date: Date) {
    this.model = date ? Helper.datePickerFormat(date) : {};
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
