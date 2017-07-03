import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SearchMenuComponent } from './SearchMenu/search-menu.component';
import { UserMenuComponent } from './UserMenu/user-menu.component';
import { ChangePasswordComponent } from './ChangePassword/change-password.component';
import { DropDownMenuComponent } from './DropDownMenu/drop-down-menu.component';

@NgModule({
  imports: [
    FormsModule, RouterModule, CommonModule, SelectModule,
    NgbModule, ToastyModule.forRoot(), ReactiveFormsModule
  ],
  declarations: [
    MenuComponent, ValidationMessage, InputPasswordComponent, TextAreaComponent, LoaderComponent, SearchMenuComponent,
    InputMultiselectComponent, InputTextComponent, InputSelectComponent, PictureCropperComponent, DropDownMenuComponent,
    InputCalendarComponent, ConfirmModalComponent, InputUniqueComponent, ImageCropperComponent, UserMenuComponent,
    ChangePasswordComponent
  ],
  exports: [
    MenuComponent, ValidationMessage, InputPasswordComponent, PictureCropperComponent, LoaderComponent,
    TextAreaComponent, InputMultiselectComponent, InputTextComponent, InputUniqueComponent, SearchMenuComponent,
    InputSelectComponent, InputCalendarComponent, ConfirmModalComponent, FormsModule, ToastyModule, UserMenuComponent,
    DropDownMenuComponent, ChangePasswordComponent
  ],
  entryComponents: [
    PictureCropperComponent, ChangePasswordComponent
  ]
})

export class SharedModule {
}
