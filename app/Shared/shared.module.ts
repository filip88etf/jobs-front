import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './Menu/menu.component';
import { ValidationMessage } from './ValidationMessage/validation-message.component';
import { InputTextComponent } from './InputText/input-text.component';

@NgModule({
  imports: [FormsModule, RouterModule, CommonModule],
  declarations: [MenuComponent, ValidationMessage, InputTextComponent ],
  exports: [MenuComponent, ValidationMessage, InputTextComponent]
})

export class SharedModule {
}
