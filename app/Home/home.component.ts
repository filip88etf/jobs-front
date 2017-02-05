import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {
  cities: string[];
  professions: string[];
  isJobActive: boolean;

  constructor() {
    this.isJobActive = true;
    this.cities = ['Beograd', 'Novi Sad', 'Cacak', 'Nis', 'Kragujevac'];
    this.professions = ['Stolar', 'Elektricar', 'Vodoinstalater', 'Zidar'];
  }

  public TabToggle (): void {
    this.isJobActive = !this.isJobActive;
    console.log('I"m in');
  }
}
