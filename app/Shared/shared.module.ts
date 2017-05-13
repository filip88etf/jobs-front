import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectModule } from 'ng-select';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ToastyModule } from 'ng2-toasty';

import { MenuComponent } from './Menu/menu.component';
import { ValidationMessage } from './ValidationMessage/validation-message.component';
import { InputTextComponent } from './InputText/input-text.component';
import { InputSelectComponent } from './InputSelect/input-select.component';
import { InputCalendarComponent } from './InputCalendar/input-calendar.component';
import { InputPasswordComponent } from './InputPassword/input-password.component';
import { ConfirmModalComponent } from './ConfirmModal/confirm-modal.component';
import { TextAreaComponent } from './TextArea/text-area.component';
import { InputMultiselectComponent } from './InputMultiselect/input-multiselect.component';

@NgModule({
  imports: [
    FormsModule, RouterModule, CommonModule, SelectModule,
    ModalModule.forRoot(), MyDatePickerModule, ToastyModule.forRoot()
  ],
  declarations: [
    MenuComponent, ValidationMessage, InputPasswordComponent, TextAreaComponent,
    InputMultiselectComponent, InputTextComponent, InputSelectComponent,
    InputCalendarComponent, ConfirmModalComponent
  ],
  exports: [
    MenuComponent, ValidationMessage, MyDatePickerModule, InputPasswordComponent,
    TextAreaComponent, InputMultiselectComponent, InputTextComponent,
    InputSelectComponent, InputCalendarComponent, ConfirmModalComponent, FormsModule, ToastyModule
  ]
})

export class SharedModule {
}
