import { Component, Input } from '@angular/core';

import { Option } from '../../global-consts';

@Component({
  moduleId: module.id,
  selector: 'app-input-select',
  templateUrl: 'input-select.component.html'
})

export class InputSelectComponent {
  @Input() options: Option[];
  @Input() selected: Option;
  @Input() label: string;
}
