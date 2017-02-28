import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './Menu/menu.component';
import { ValidationMessage } from './ValidationMessage/validation-message.component';

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [MenuComponent, ValidationMessage],
  exports: [MenuComponent, ValidationMessage]
})

export class SharedModule {

}
