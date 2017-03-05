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
  requiredMessage: string = '';
  minLengthMessage: string = '';

  showMessages(): boolean {
    let errors = this.control.errors;
    let minLengthError: string;

    if (errors && this.control.touched) {
      this.requiredMessage = errors['required'] ? REQUIRED_MESSAGE : '';
      if (errors['minlength']) {
        this.minLengthMessage = MINLENGTH_MESSAGE + errors['minlength'].requiredLength + ' characters';
      } else {
        this.minLengthMessage = '';
      }
    } else {
      this.requiredMessage = '';
      this.minLengthMessage = '';
    }
    return true;
  }
}
