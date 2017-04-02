import { Component, Input } from '@angular/core';
import { IMyOptions } from 'mydatepicker';

import { CALENDAR_SETTINGS } from '../../global-consts';

@Component({
  moduleId: module.id,
  selector: 'app-input-calendar',
  templateUrl: 'input-calendar.component.html'
})

export class InputCalendarComponent {
  calendarOptions: IMyOptions = CALENDAR_SETTINGS;
  @Input() label: string;
  @Input() model: string;
}
