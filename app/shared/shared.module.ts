import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { MenuComponent } from './menu/menu.component';
import { ValidationMessage } from './validation-message/validation-message.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputCalendarComponent } from './input-calendar/input-calendar.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { InputMultiselectComponent } from './input-multiselect/input-multiselect.component';
import { InputUniqueComponent } from './input-unique/input-unique.component';
import { PictureCropperComponent } from './picture-cropper/picture-cropper.component';
import { LoaderComponent } from './loader/loader.component';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';

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
    DropDownMenuComponent, ChangePasswordComponent, ImageCropperComponent
  ],
  entryComponents: [
    PictureCropperComponent, ChangePasswordComponent
  ]
})

export class SharedModule {
}
