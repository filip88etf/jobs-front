import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-input-text',
  templateUrl: 'input-text.component.html'
})

export class InputTextComponent {
  @Input() model: string;
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() minLength: number = 10;
}
