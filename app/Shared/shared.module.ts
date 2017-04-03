import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectModule } from 'ng2-select';

import { MenuComponent } from './Menu/menu.component';
import { ValidationMessage } from './ValidationMessage/validation-message.component';
import { InputTextComponent } from './InputText/input-text.component';
import { InputSelectComponent } from './InputSelect/input-select.component';
import { InputCalendarComponent } from './InputCalendar/input-calendar.component';
import { InputPasswordComponent } from './InputPassword/input-password.component';

@NgModule({
  imports: [ FormsModule, RouterModule, CommonModule, SelectModule, MyDatePickerModule ],
  declarations: [ MenuComponent, ValidationMessage, InputPasswordComponent,
    InputTextComponent, InputSelectComponent, InputCalendarComponent ],
  exports: [ MenuComponent, ValidationMessage, MyDatePickerModule, InputPasswordComponent,
    InputTextComponent, InputSelectComponent, InputCalendarComponent ]
})

export class SharedModule {
}
