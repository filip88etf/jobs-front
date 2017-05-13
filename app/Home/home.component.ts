import { Component } from '@angular/core';

import { CITIES, PROFESSIONS } from '../global-consts';
import { Option } from '../global-types';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {
  cities: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  isJobSearch: boolean = true;
  startSearch: boolean = false;
  proffesion: Option;
  city: Option;

  constructor(private toastyService: ToastyService) {}

  showMessage(selected: Option): string {
    if (selected === undefined && this.startSearch) {
      return 'Please select one';
    }
    return '';
  }

  public searchJobs (value: boolean): void {
    this.isJobSearch = value;
  }

  search(): void {
    let toastOptions: ToastOptions = {
        title: 'My title',
        msg: 'The message',
        showClose: true,
        timeout: 5000,
        theme: 'bootstrap'
    };
        // Add see all possible types in one shot
    this.toastyService.info(toastOptions);
    this.toastyService.default('Idemo saliso!!!!!!');
    this.startSearch = true;
  }
}
