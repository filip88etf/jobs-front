import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { MenuComponent } from './Menu/menu.component';
import { ValidationMessage } from './ValidationMessage/validation-message.component';
import { InputTextComponent } from './InputText/input-text.component';
import { InputSelectComponent } from './InputSelect/input-select.component';
import { InputCalendarComponent } from './InputCalendar/input-calendar.component';
import { InputPasswordComponent } from './InputPassword/input-password.component';
import { ConfirmModalComponent } from './ConfirmModal/confirm-modal.component';

@NgModule({
  imports: [ FormsModule, RouterModule, CommonModule, SelectModule, ModalModule.forRoot(), MyDatePickerModule ],
  declarations: [ MenuComponent, ValidationMessage, InputPasswordComponent,
    InputTextComponent, InputSelectComponent, InputCalendarComponent, ConfirmModalComponent ],
  exports: [ MenuComponent, ValidationMessage, MyDatePickerModule, InputPasswordComponent,
    InputTextComponent, InputSelectComponent, InputCalendarComponent, ConfirmModalComponent ]
})

export class SharedModule {
}
