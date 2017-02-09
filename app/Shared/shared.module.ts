import { NgModule } from '@angular/core';

import { MenuComponent } from './Menu/menu.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [AppRoutingModule],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})

export class SharedModule {

}
