import { Component } from '@angular/core';

interface Option {
  value: number;
  label: string;
}

@Component({
  selector: 'app-manual-signup',
  moduleId: module.id,
  templateUrl: 'manual-signup.component.html',
  styleUrls: ['manual-signup.component.css']
})

export class ManualSignupComponent {
  genderList: Option[] = [
    { value: 0, label: 'Female'},
    { value: 1, label: 'Male'}
  ];
}
