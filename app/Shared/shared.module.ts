import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { MenuComponent } from './Menu/menu.component';
import { ValidationMessage } from './ValidationMessage/validation-message.component';
import { InputTextComponent } from './InputText/input-text.component';
import { InputSelectComponent } from './InputSelect/input-select.component';
import { InputCalendarComponent } from './InputCalendar/input-calendar.component';
import { InputPasswordComponent } from './InputPassword/input-password.component';
import { ConfirmModalComponent } from './ConfirmModal/confirm-modal.component';
import { TextAreaComponent } from './TextArea/text-area.component';
import { InputMultiselectComponent } from './InputMultiselect/input-multiselect.component';
import { InputUniqueComponent } from './InputUnique/input-unique.component';
import { PictureCropperComponent } from './PictureCropper/picture-cropper.component';
import { LoaderComponent } from './Loader/loader.component';

@NgModule({
  imports: [
    FormsModule, RouterModule, CommonModule, SelectModule,
    NgbModule, ToastyModule.forRoot()
  ],
  declarations: [
    MenuComponent, ValidationMessage, InputPasswordComponent, TextAreaComponent, LoaderComponent,
    InputMultiselectComponent, InputTextComponent, InputSelectComponent, PictureCropperComponent,
    InputCalendarComponent, ConfirmModalComponent, InputUniqueComponent, ImageCropperComponent
  ],
  exports: [
    MenuComponent, ValidationMessage, InputPasswordComponent, PictureCropperComponent, LoaderComponent,
    TextAreaComponent, InputMultiselectComponent, InputTextComponent, InputUniqueComponent,
    InputSelectComponent, InputCalendarComponent, ConfirmModalComponent, FormsModule, ToastyModule
  ],
  entryComponents: [
    PictureCropperComponent
  ]
})

export class SharedModule {
}
