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
import { ConfirmModal } from './confirm/confirm.modal';
import { TextAreaComponent } from './text-area/text-area.component';
import { InputMultiselectComponent } from './input-multiselect/input-multiselect.component';
import { InputUniqueComponent } from './input-unique/input-unique.component';
import { PictureCropperModal } from './picture-cropper/picture-cropper.modal';
import { LoaderComponent } from './loader/loader.component';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ChangePasswordModal } from './change-password/change-password.modal';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';
import { ReviewComponent } from './review/review.component';
import { ReportModal } from './report/report.modal';

@NgModule({
  imports: [
    FormsModule, RouterModule, CommonModule, SelectModule,
    NgbModule, ToastyModule.forRoot(), ReactiveFormsModule
  ],
  declarations: [
    MenuComponent, ValidationMessage, InputPasswordComponent, TextAreaComponent, LoaderComponent, SearchMenuComponent,
    InputMultiselectComponent, InputTextComponent, InputSelectComponent, PictureCropperModal, DropDownMenuComponent,
    InputCalendarComponent, ConfirmModal, InputUniqueComponent, ImageCropperComponent, UserMenuComponent,
    ChangePasswordModal, ReviewComponent, ReportModal
  ],
  exports: [
    MenuComponent, ValidationMessage, InputPasswordComponent, PictureCropperModal, LoaderComponent,
    TextAreaComponent, InputMultiselectComponent, InputTextComponent, InputUniqueComponent, SearchMenuComponent,
    InputSelectComponent, InputCalendarComponent, ConfirmModal, FormsModule, ToastyModule, UserMenuComponent,
    DropDownMenuComponent, ChangePasswordModal, ImageCropperComponent, ReviewComponent
  ],
  entryComponents: [
    PictureCropperModal, ChangePasswordModal, ReportModal
  ]
})

export class SharedModule {
}
