import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [HomeComponent, MenuComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
