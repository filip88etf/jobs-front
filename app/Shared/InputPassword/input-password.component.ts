import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-input-password',
  templateUrl: 'input-password.component.html'
})

export class InputPasswordComponent {
  @Input() model: string;
  @Input() label: string;
  @Input() required: boolean = false;
}
