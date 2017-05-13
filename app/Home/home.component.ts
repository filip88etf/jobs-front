import { Component } from '@angular/core';

import { CITIES, PROFESSIONS } from '../global-consts';
import { Option } from '../global-types';

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

  constructor() {}

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
    this.startSearch = true;
  }
}
