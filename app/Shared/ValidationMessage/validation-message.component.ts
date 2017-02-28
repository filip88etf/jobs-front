import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

const REQUIRED_MESSAGE: string = 'This field is required';
const MINLENGTH_MESSAGE: string = 'Minimal length is ';

@Component({
  moduleId: module.id,
  selector: 'validation-message',
  templateUrl: 'validation-message.component.html'
})

export class ValidationMessage {
  @Input() control: AbstractControl;
  requiredMessage: string;
  minLengthMessage: string;

  showMessages(): boolean {
    let errors = this.control.errors,
        minLengthError = MINLENGTH_MESSAGE + errors['minlength'].requiredLength + ' characters';
    if (errors && this.control.touched) {
      this.requiredMessage = errors['required'] ? REQUIRED_MESSAGE : '';
      this.minLengthMessage = errors['minlength'] ? minLengthError : '';
    } else {
      this.requiredMessage = '';
      this.minLengthMessage = '';
    }
    return true;
  }
}
