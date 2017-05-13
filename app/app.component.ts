import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  moduleId: module.id,
  selector: 'app-component',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  constructor(private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
  }
}
