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
  isJobActive: boolean;

  constructor() {
    this.isJobActive = true;
    this.cities = CITIES;
    this.professions = PROFFESSIONS;
  }

  public TabToggle (): void {
    this.isJobActive = !this.isJobActive;
    console.log('I"m in');
  }
}
