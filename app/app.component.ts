import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { NotificationService } from './Core/Services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'app-component',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  private notificationConfig: Object;

  constructor(private toastyConfig: ToastyConfig, private notificationService: NotificationService) {
    this.toastyConfig.theme = 'bootstrap';
    this.notificationConfig = this.notificationService.getConfig();
  }
}
