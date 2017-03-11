import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

const REQUIRED_MESSAGE: string = 'This field is required';
const MINLENGTH_MESSAGE: string = 'Minimal length is ';
const EMAIL_MESSAGE: string = 'Invalid email';

@Component({
  moduleId: module.id,
  selector: 'validation-message',
  templateUrl: 'validation-message.component.html'
})

export class ValidationMessage {
  @Input() control: AbstractControl;
  requiredMessage: string = '';
  minLengthMessage: string = '';
  emailErrorMessage: string = '';

  showMessages(): boolean {
    let errors = this.control.errors;
    let minLengthError: string;
    this.requiredMessage = '';
    this.minLengthMessage = '';
    this.emailErrorMessage = '';

    if (errors && this.control.touched) {
      this.requiredMessage = errors['required'] ? REQUIRED_MESSAGE : '';
      this.emailErrorMessage = errors['email'] ? EMAIL_MESSAGE : '';

      if (errors['minlength']) {
        this.minLengthMessage = MINLENGTH_MESSAGE + errors['minlength'].requiredLength + ' characters';
      } else {
        this.minLengthMessage = '';
      }
    }
    return true;
  }
}
