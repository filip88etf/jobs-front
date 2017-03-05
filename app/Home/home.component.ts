import { Component } from '@angular/core';

import { CITIES, PROFFESSIONS, Option } from '../global-consts';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {
  cities: Option[] = CITIES;
  professions: Option[] = PROFFESSIONS;
  isJobSearch: boolean = true;
  startSearch: boolean = false;
  proffesion: Option;
  city: Option;

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
